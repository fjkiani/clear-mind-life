"""
refresh_service.py — Automated quarterly/annual refresh for all CMS code sets.

Schedule:
  - ICD-10-CM:   Annual, October 1 (CMS fiscal year)
  - HCPCS:       Quarterly (Jan, Apr, Jul, Oct)
  - NCCI PTP:    Quarterly (Jan, Apr, Jul, Oct)
  - NCCI MUE:    Quarterly (Jan, Apr, Jul, Oct)
  - RVU:         Quarterly (Jan, Apr, Jul, Oct)

Uses APScheduler with SQLite job store for persistence across restarts.
All refresh events are logged to the `refresh_log` table in medical_codes.db.
"""

import sqlite3
import logging
import hashlib
import zipfile
import io
import os
import csv
import re
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional

import requests

logger = logging.getLogger(__name__)

# ── Paths ─────────────────────────────────────────────────────────────────────
_HERE = Path(__file__).resolve().parent
_DB_PATH = _HERE.parent.parent / "data" / "medical_codes.db"
_CACHE_DIR = _HERE.parent.parent / "data" / "cache"
_CACHE_DIR.mkdir(parents=True, exist_ok=True)

# ── CMS Download URLs (updated quarterly by CMS) ──────────────────────────────
CMS_SOURCES = {
    "icd10_cm": {
        "url": "https://www.cms.gov/files/zip/2026-code-descriptions-tabular-order.zip",
        "table": "icd10_codes",
        "schedule": "annual",   # October
        "description": "ICD-10-CM FY2026 Diagnosis Codes",
    },
    "hcpcs": {
        "url": "https://www.cms.gov/files/zip/july-2026-alpha-numeric-hcpcs-file.zip",
        "table": "hcpcs_codes",
        "schedule": "quarterly",
        "description": "HCPCS Level II Alpha-Numeric File",
    },
    "ncci_ptp_f1": {
        "url": "https://www.cms.gov/files/zip/medicare-ncci-2026q2-practitioner-ptp-edits-ccipra-v321r0-f1.zip",
        "table": "ncci_ptp_edits",
        "schedule": "quarterly",
        "description": "NCCI PTP Edits Q2 2026 File 1",
    },
    "ncci_ptp_f2": {
        "url": "https://www.cms.gov/files/zip/medicare-ncci-2026q2-practitioner-ptp-edits-ccipra-v321r0-f2.zip",
        "table": "ncci_ptp_edits",
        "schedule": "quarterly",
        "description": "NCCI PTP Edits Q2 2026 File 2",
    },
    "ncci_ptp_f3": {
        "url": "https://www.cms.gov/files/zip/medicare-ncci-2026q2-practitioner-ptp-edits-ccipra-v321r0-f3.zip",
        "table": "ncci_ptp_edits",
        "schedule": "quarterly",
        "description": "NCCI PTP Edits Q2 2026 File 3",
    },
    "ncci_ptp_f4": {
        "url": "https://www.cms.gov/files/zip/medicare-ncci-2026q2-practitioner-ptp-edits-ccipra-v321r0-f4.zip",
        "table": "ncci_ptp_edits",
        "schedule": "quarterly",
        "description": "NCCI PTP Edits Q2 2026 File 4",
    },
    "ncci_mue": {
        "url": "https://www.cms.gov/files/zip/medicare-ncci-2026-q2-practitioner-services-mue-table.zip",
        "table": "ncci_mue_values",
        "schedule": "quarterly",
        "description": "NCCI MUE Values Q2 2026",
    },
    "rvu": {
        "url": "https://www.cms.gov/files/zip/rvu26a.zip",
        "table": "cpt_rvu",
        "schedule": "quarterly",
        "description": "Medicare Physician Fee Schedule RVU26A",
    },
}

# ── CMS quarterly release calendar ───────────────────────────────────────────
# Q1 = January 1, Q2 = April 1, Q3 = July 1, Q4 = October 1
QUARTERLY_MONTHS = [1, 4, 7, 10]
ANNUAL_MONTH = 10  # ICD-10-CM fiscal year starts October 1


def _get_conn():
    conn = sqlite3.connect(str(_DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def _log_refresh(source_key: str, status: str, records_updated: int = 0,
                 error_msg: Optional[str] = None, file_hash: Optional[str] = None):
    """Write a refresh event to the refresh_log table."""
    conn = _get_conn()
    try:
        conn.execute("""
            INSERT INTO refresh_log (source, status, records_updated, error_message, file_hash, refreshed_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (source_key, status, records_updated, error_msg, file_hash,
              datetime.now(timezone.utc).isoformat()))
        conn.commit()
    except Exception as e:
        logger.error(f"Failed to write refresh log: {e}")
    finally:
        conn.close()


def _download_with_cache(url: str, source_key: str) -> Optional[bytes]:
    """Download a file, using local cache if unchanged (ETag/Last-Modified)."""
    cache_file = _CACHE_DIR / f"{source_key}.zip"
    headers = {}

    # Load cached ETag/Last-Modified
    etag_file = _CACHE_DIR / f"{source_key}.etag"
    if etag_file.exists() and cache_file.exists():
        etag_data = etag_file.read_text().strip().split("\n")
        if len(etag_data) >= 1 and etag_data[0]:
            headers["If-None-Match"] = etag_data[0]
        if len(etag_data) >= 2 and etag_data[1]:
            headers["If-Modified-Since"] = etag_data[1]

    try:
        logger.info(f"Downloading {source_key} from {url}")
        resp = requests.get(url, headers=headers, timeout=300, stream=True)

        if resp.status_code == 304:
            logger.info(f"{source_key}: Not modified (304) — using cached file")
            return cache_file.read_bytes() if cache_file.exists() else None

        resp.raise_for_status()
        data = resp.content

        # Save to cache
        cache_file.write_bytes(data)

        # Save ETag/Last-Modified for next check
        etag = resp.headers.get("ETag", "")
        last_mod = resp.headers.get("Last-Modified", "")
        etag_file.write_text(f"{etag}\n{last_mod}")

        logger.info(f"{source_key}: Downloaded {len(data):,} bytes")
        return data

    except requests.RequestException as e:
        logger.error(f"{source_key}: Download failed: {e}")
        # Fall back to cache if available
        if cache_file.exists():
            logger.warning(f"{source_key}: Using stale cache due to download failure")
            return cache_file.read_bytes()
        return None


def _sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


# ── Per-table refresh functions ───────────────────────────────────────────────

def refresh_icd10_cm() -> dict:
    """Re-download and reload ICD-10-CM diagnosis codes."""
    source_key = "icd10_cm"
    source = CMS_SOURCES[source_key]
    logger.info(f"Starting refresh: {source['description']}")

    data = _download_with_cache(source["url"], source_key)
    if not data:
        _log_refresh(source_key, "FAILED", error_msg="Download returned no data")
        return {"status": "failed", "error": "Download returned no data"}

    file_hash = _sha256(data)
    records = 0

    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            # Find the order file (tab-delimited)
            order_file = next(
                (n for n in zf.namelist() if "order" in n.lower() and n.endswith(".txt")),
                None
            )
            if not order_file:
                raise ValueError("Could not find ICD-10-CM order file in ZIP")

            rows = []
            with zf.open(order_file) as f:
                for line in f:
                    line = line.decode("utf-8", errors="replace").rstrip("\n\r")
                    if len(line) < 77:
                        continue
                    order_num = line[0:5].strip()
                    code = line[6:13].strip()
                    valid = line[14:15].strip()
                    short_desc = line[16:76].strip()
                    long_desc = line[77:].strip() if len(line) > 77 else short_desc
                    if code and valid == "1":
                        rows.append((code, short_desc, long_desc, "FY2026", 1))

            conn = _get_conn()
            conn.execute("DELETE FROM icd10_codes")
            conn.executemany(
                "INSERT OR REPLACE INTO icd10_codes (code, short_description, long_description, fiscal_year, is_billable) VALUES (?,?,?,?,?)",
                rows
            )
            conn.commit()
            records = len(rows)
            conn.close()

    except Exception as e:
        logger.error(f"ICD-10-CM refresh failed: {e}")
        _log_refresh(source_key, "FAILED", error_msg=str(e), file_hash=file_hash)
        return {"status": "failed", "error": str(e)}

    _log_refresh(source_key, "SUCCESS", records_updated=records, file_hash=file_hash)
    logger.info(f"ICD-10-CM refresh complete: {records:,} codes loaded")
    return {"status": "success", "records": records, "hash": file_hash}


def refresh_hcpcs() -> dict:
    """Re-download and reload HCPCS Level II codes."""
    source_key = "hcpcs"
    source = CMS_SOURCES[source_key]
    logger.info(f"Starting refresh: {source['description']}")

    data = _download_with_cache(source["url"], source_key)
    if not data:
        _log_refresh(source_key, "FAILED", error_msg="Download returned no data")
        return {"status": "failed", "error": "Download returned no data"}

    file_hash = _sha256(data)
    records = 0

    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            anfile = next(
                (n for n in zf.namelist() if n.lower().endswith(".txt") and "anweb" in n.lower()),
                next((n for n in zf.namelist() if n.lower().endswith(".txt")), None)
            )
            if not anfile:
                raise ValueError("Could not find HCPCS AN file in ZIP")

            rows = []
            with zf.open(anfile) as f:
                for line in f:
                    line = line.decode("latin-1", errors="replace")
                    if len(line) < 119:
                        continue
                    code = line[0:5].strip()
                    rec_id = line[10:11].strip()
                    long_desc = line[11:91].strip()
                    short_desc = line[91:119].strip()
                    eff_date = line[276:284].strip() if len(line) > 284 else ""
                    if code and rec_id in ("A", "B", "C", "D", "E", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V"):
                        rows.append((code, short_desc, long_desc, rec_id, eff_date, None))

            conn = _get_conn()
            conn.execute("DELETE FROM hcpcs_codes")
            conn.executemany(
                "INSERT OR REPLACE INTO hcpcs_codes (code, short_description, long_description, record_id, effective_date, termination_date) VALUES (?,?,?,?,?,?)",
                rows
            )
            conn.commit()
            records = len(rows)
            conn.close()

    except Exception as e:
        logger.error(f"HCPCS refresh failed: {e}")
        _log_refresh(source_key, "FAILED", error_msg=str(e), file_hash=file_hash)
        return {"status": "failed", "error": str(e)}

    _log_refresh(source_key, "SUCCESS", records_updated=records, file_hash=file_hash)
    logger.info(f"HCPCS refresh complete: {records:,} codes loaded")
    return {"status": "success", "records": records, "hash": file_hash}


def refresh_ncci_ptp() -> dict:
    """Re-download and reload all 4 NCCI PTP edit files."""
    results = {}
    total_records = 0

    # Clear the table once before loading all 4 files
    conn = _get_conn()
    conn.execute("DELETE FROM ncci_ptp_edits")
    conn.commit()
    conn.close()

    for file_num in range(1, 5):
        source_key = f"ncci_ptp_f{file_num}"
        source = CMS_SOURCES[source_key]
        logger.info(f"Starting refresh: {source['description']}")

        data = _download_with_cache(source["url"], source_key)
        if not data:
            results[source_key] = "FAILED: no data"
            continue

        file_hash = _sha256(data)
        records = 0

        try:
            with zipfile.ZipFile(io.BytesIO(data)) as zf:
                txt_file = next(
                    (n for n in zf.namelist() if n.lower().endswith(".txt")),
                    None
                )
                if not txt_file:
                    raise ValueError(f"No .txt file in {source_key} ZIP")

                rows = []
                with zf.open(txt_file) as f:
                    for line in f:
                        line = line.decode("latin-1", errors="replace").strip()
                        if not line or line.startswith("Col"):
                            continue
                        parts = line.split("\t")
                        if len(parts) < 6:
                            continue
                        col1 = parts[0].strip()
                        col2 = parts[1].strip()
                        eff_date = parts[3].strip() if len(parts) > 3 else ""
                        del_date = parts[4].strip() if len(parts) > 4 else ""
                        try:
                            mod_ind = int(parts[5].strip()) if parts[5].strip().isdigit() else 9
                        except (ValueError, IndexError):
                            mod_ind = 9
                        if col1 and col2 and len(col1) >= 4:
                            rows.append((col1, col2, eff_date, del_date, mod_ind))

                conn = _get_conn()
                conn.executemany(
                    "INSERT INTO ncci_ptp_edits (col1_code, col2_code, effective_date, deletion_date, modifier_indicator) VALUES (?,?,?,?,?)",
                    rows
                )
                conn.commit()
                records = len(rows)
                total_records += records
                conn.close()

        except Exception as e:
            logger.error(f"{source_key} refresh failed: {e}")
            _log_refresh(source_key, "FAILED", error_msg=str(e), file_hash=file_hash)
            results[source_key] = f"FAILED: {e}"
            continue

        _log_refresh(source_key, "SUCCESS", records_updated=records, file_hash=file_hash)
        results[source_key] = f"OK: {records:,} rows"

    logger.info(f"NCCI PTP refresh complete: {total_records:,} total edit pairs")
    return {"status": "success", "total_records": total_records, "files": results}


def refresh_ncci_mue() -> dict:
    """Re-download and reload NCCI MUE values."""
    source_key = "ncci_mue"
    source = CMS_SOURCES[source_key]
    logger.info(f"Starting refresh: {source['description']}")

    data = _download_with_cache(source["url"], source_key)
    if not data:
        _log_refresh(source_key, "FAILED", error_msg="Download returned no data")
        return {"status": "failed", "error": "Download returned no data"}

    file_hash = _sha256(data)
    records = 0

    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            txt_file = next(
                (n for n in zf.namelist() if n.lower().endswith(".txt")),
                None
            )
            if not txt_file:
                raise ValueError("No .txt file in MUE ZIP")

            rows = []
            with zf.open(txt_file) as f:
                for line in f:
                    line = line.decode("latin-1", errors="replace").strip()
                    if not line or line.startswith("HCPCS") or line.startswith("CPT"):
                        continue
                    parts = re.split(r"\t|,", line)
                    if len(parts) < 3:
                        continue
                    code = parts[0].strip().upper()
                    try:
                        mue_val = int(parts[2].strip())
                    except (ValueError, IndexError):
                        continue
                    mai = parts[3].strip() if len(parts) > 3 else ""
                    if code and len(code) >= 4:
                        rows.append((code, mue_val, mai))

            conn = _get_conn()
            conn.execute("DELETE FROM ncci_mue_values")
            conn.executemany(
                "INSERT OR REPLACE INTO ncci_mue_values (code, mue_value, mue_adjudication_indicator) VALUES (?,?,?)",
                rows
            )
            conn.commit()
            records = len(rows)
            conn.close()

    except Exception as e:
        logger.error(f"NCCI MUE refresh failed: {e}")
        _log_refresh(source_key, "FAILED", error_msg=str(e), file_hash=file_hash)
        return {"status": "failed", "error": str(e)}

    _log_refresh(source_key, "SUCCESS", records_updated=records, file_hash=file_hash)
    logger.info(f"NCCI MUE refresh complete: {records:,} codes loaded")
    return {"status": "success", "records": records, "hash": file_hash}


def refresh_rvu() -> dict:
    """Re-download and reload Medicare RVU file."""
    source_key = "rvu"
    source = CMS_SOURCES[source_key]
    logger.info(f"Starting refresh: {source['description']}")

    data = _download_with_cache(source["url"], source_key)
    if not data:
        _log_refresh(source_key, "FAILED", error_msg="Download returned no data")
        return {"status": "failed", "error": "Download returned no data"}

    file_hash = _sha256(data)
    records = 0

    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            rvu_file = next(
                (n for n in zf.namelist() if "pprrvu" in n.lower() and n.lower().endswith(".txt")),
                next((n for n in zf.namelist() if n.lower().endswith(".txt")), None)
            )
            if not rvu_file:
                raise ValueError("No RVU .txt file found in ZIP")

            rows = []
            with zf.open(rvu_file) as f:
                reader = csv.reader(io.TextIOWrapper(f, encoding="latin-1"))
                header_found = False
                for row in reader:
                    if not row:
                        continue
                    if not header_found:
                        if row[0].strip().upper() in ("HCPCS", "CPT", "CODE"):
                            header_found = True
                        continue
                    if len(row) < 10:
                        continue
                    code = row[0].strip()
                    mod = row[1].strip()
                    description = row[2].strip() if len(row) > 2 else ""
                    status = row[3].strip() if len(row) > 3 else ""

                    def safe_float(val, max_val=500.0):
                        try:
                            v = float(val.strip())
                            return v if v <= max_val else None
                        except (ValueError, AttributeError):
                            return None

                    work_rvu = safe_float(row[4]) if len(row) > 4 else None
                    pe_rvu = safe_float(row[7]) if len(row) > 7 else None
                    mp_rvu = safe_float(row[10]) if len(row) > 10 else None
                    total_rvu = safe_float(row[13]) if len(row) > 13 else None
                    global_days = row[17].strip() if len(row) > 17 else ""

                    if code and len(code) >= 4:
                        rows.append((code, mod, description, status, work_rvu, pe_rvu, mp_rvu, total_rvu, global_days))

            conn = _get_conn()
            conn.execute("DELETE FROM cpt_rvu")
            conn.executemany(
                "INSERT OR REPLACE INTO cpt_rvu (hcpcs_code, modifier, description, status_code, work_rvu, pe_rvu, mp_rvu, total_rvu, global_days) VALUES (?,?,?,?,?,?,?,?,?)",
                rows
            )
            conn.commit()
            records = len(rows)
            conn.close()

    except Exception as e:
        logger.error(f"RVU refresh failed: {e}")
        _log_refresh(source_key, "FAILED", error_msg=str(e), file_hash=file_hash)
        return {"status": "failed", "error": str(e)}

    _log_refresh(source_key, "SUCCESS", records_updated=records, file_hash=file_hash)
    logger.info(f"RVU refresh complete: {records:,} codes loaded")
    return {"status": "success", "records": records, "hash": file_hash}


# ── Scheduler setup ───────────────────────────────────────────────────────────

def run_quarterly_refresh():
    """Run all quarterly refreshes. Called by APScheduler on Jan/Apr/Jul/Oct 1."""
    logger.info("=== QUARTERLY REFRESH STARTED ===")
    results = {}
    results["hcpcs"] = refresh_hcpcs()
    results["ncci_ptp"] = refresh_ncci_ptp()
    results["ncci_mue"] = refresh_ncci_mue()
    results["rvu"] = refresh_rvu()
    logger.info(f"=== QUARTERLY REFRESH COMPLETE: {results} ===")
    return results


def run_annual_refresh():
    """Run annual ICD-10-CM refresh. Called by APScheduler on October 1."""
    logger.info("=== ANNUAL ICD-10-CM REFRESH STARTED ===")
    result = refresh_icd10_cm()
    logger.info(f"=== ANNUAL REFRESH COMPLETE: {result} ===")
    return result


def run_full_refresh():
    """Run all refreshes immediately. Useful for manual trigger or initial setup."""
    logger.info("=== FULL REFRESH STARTED ===")
    results = {}
    results["icd10_cm"] = refresh_icd10_cm()
    results["hcpcs"] = refresh_hcpcs()
    results["ncci_ptp"] = refresh_ncci_ptp()
    results["ncci_mue"] = refresh_ncci_mue()
    results["rvu"] = refresh_rvu()
    logger.info(f"=== FULL REFRESH COMPLETE ===")
    return results


def get_refresh_log(limit: int = 50) -> list:
    """Return the most recent refresh log entries."""
    conn = _get_conn()
    rows = conn.execute(
        "SELECT * FROM refresh_log ORDER BY refreshed_at DESC LIMIT ?",
        (limit,)
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_refresh_status() -> dict:
    """Return the last refresh status for each source."""
    conn = _get_conn()
    rows = conn.execute("""
        SELECT source, status, records_updated, refreshed_at, error_message
        FROM refresh_log
        WHERE id IN (
            SELECT MAX(id) FROM refresh_log GROUP BY source
        )
        ORDER BY source
    """).fetchall()
    conn.close()
    return {r["source"]: dict(r) for r in rows}


def start_scheduler():
    """
    Start the APScheduler background scheduler.
    Call this from main.py lifespan or startup event.

    Requires: pip install apscheduler
    """
    try:
        from apscheduler.schedulers.background import BackgroundScheduler
        from apscheduler.triggers.cron import CronTrigger

        scheduler = BackgroundScheduler(timezone="UTC")

        # Quarterly refresh: Jan 1, Apr 1, Jul 1, Oct 1 at 02:00 UTC
        scheduler.add_job(
            run_quarterly_refresh,
            CronTrigger(month="1,4,7,10", day=1, hour=2, minute=0),
            id="quarterly_refresh",
            name="Quarterly CMS Code Refresh",
            replace_existing=True,
            misfire_grace_time=3600,  # 1 hour grace if server was down
        )

        # Annual ICD-10-CM refresh: October 1 at 03:00 UTC (after quarterly)
        scheduler.add_job(
            run_annual_refresh,
            CronTrigger(month=10, day=1, hour=3, minute=0),
            id="annual_icd10_refresh",
            name="Annual ICD-10-CM Refresh",
            replace_existing=True,
            misfire_grace_time=3600,
        )

        scheduler.start()
        logger.info("APScheduler started: quarterly (Jan/Apr/Jul/Oct 1 02:00 UTC) + annual ICD-10-CM (Oct 1 03:00 UTC)")
        return scheduler

    except ImportError:
        logger.warning("APScheduler not installed — refresh scheduler disabled. Run: pip install apscheduler")
        return None
    except Exception as e:
        logger.error(f"Failed to start scheduler: {e}")
        return None
