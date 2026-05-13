#!/usr/bin/env python3
"""
download_codes.py — Master downloader for all authoritative medical coding databases.

Sources (all free, public domain):
  - ICD-10-CM FY2026       : CDC/CMS
  - HCPCS Level II Q2 2026 : CMS
  - NCCI PTP Edits Q2 2026 : CMS (Practitioner)
  - NCCI MUE Values Q2 2026: CMS (Practitioner)
  - Medicare PFS RVU26A    : CMS
  - NUCC Taxonomy Codes    : NUCC

Run:
  python scripts/download_codes.py [--db path/to/medical_codes.db] [--skip-download]
"""

import argparse
import io
import os
import re
import sqlite3
import sys
import time
import zipfile
from datetime import datetime
from pathlib import Path

import requests

# ─── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
BACKEND_DIR = SCRIPT_DIR.parent
DATA_DIR = BACKEND_DIR / "data"
CACHE_DIR = DATA_DIR / "cache"
DATA_DIR.mkdir(exist_ok=True)
CACHE_DIR.mkdir(exist_ok=True)

DEFAULT_DB = DATA_DIR / "medical_codes.db"

# ─── Source URLs ──────────────────────────────────────────────────────────────
SOURCES = {
    "icd10_cm": {
        "url": "https://ftp.cdc.gov/pub/health_statistics/nchs/Publications/ICD10CM/2025/icd10cm-codes-April-2026.zip",
        "fallback": "https://ftp.cdc.gov/pub/health_statistics/nchs/Publications/ICD10CM/2025/icd10cm_codes_2025.zip",
        "version": "FY2026",
        "description": "ICD-10-CM Diagnosis Codes FY2026",
    },
    "hcpcs": {
        "url": "https://www.cms.gov/files/zip/2026-alpha-numeric-hcpcs-file.zip",
        "fallback": "https://www.cms.gov/files/zip/2025-alpha-numeric-hcpcs-file.zip",
        "version": "Q2_2026",
        "description": "HCPCS Level II Alpha-Numeric File Q2 2026",
    },
    "ncci_ptp": {
        "url": "https://www.cms.gov/files/zip/ncci26p2-practitioner.zip",
        "fallback": "https://www.cms.gov/files/zip/ncci25p4-practitioner.zip",
        "version": "Q2_2026",
        "description": "NCCI PTP Practitioner Edits Q2 2026",
    },
    "ncci_mue": {
        "url": "https://www.cms.gov/files/zip/ncci-mue-practitioner-services-2026-q2.zip",
        "fallback": "https://www.cms.gov/files/zip/ncci-mue-practitioner-services-2025-q4.zip",
        "version": "Q2_2026",
        "description": "NCCI MUE Practitioner Services Q2 2026",
    },
    "rvu": {
        "url": "https://www.cms.gov/files/zip/rvu26a.zip",
        "fallback": "https://www.cms.gov/files/zip/rvu25d-updated-09/11/2025.zip",
        "version": "2026A",
        "description": "Medicare PFS Relative Value Units 2026A",
    },
    "taxonomy": {
        "url": "https://nucc.org/images/stories/CSV/nucc_taxonomy_240.csv",
        "fallback": "https://nucc.org/images/stories/CSV/nucc_taxonomy_230.csv",
        "version": "24.0",
        "description": "NUCC Provider Taxonomy Codes v24.0",
    },
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; MedicalCodingDB/1.0; +https://github.com/fjkiani/clear-mind-life)"
}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def download_file(url: str, cache_path: Path, fallback: str = None) -> bytes | None:
    """Download a file with caching. Returns raw bytes or None on failure."""
    if cache_path.exists():
        print(f"  [CACHE] {cache_path.name}")
        return cache_path.read_bytes()

    for attempt_url in ([url] + ([fallback] if fallback else [])):
        try:
            print(f"  [GET] {attempt_url}")
            r = requests.get(attempt_url, headers=HEADERS, timeout=120, stream=True)
            if r.status_code == 200:
                data = r.content
                cache_path.write_bytes(data)
                print(f"  [OK]  {len(data):,} bytes → {cache_path.name}")
                return data
            else:
                print(f"  [HTTP {r.status_code}] {attempt_url}")
        except Exception as e:
            print(f"  [ERR] {attempt_url}: {e}")
    return None


def open_zip_member(data: bytes, patterns: list[str]) -> str | None:
    """Open a zip and return text content of first member matching any pattern."""
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            names = zf.namelist()
            print(f"  [ZIP] members: {names[:10]}")
            for pat in patterns:
                for name in names:
                    if re.search(pat, name, re.IGNORECASE):
                        with zf.open(name) as f:
                            raw = f.read()
                            # Try UTF-8, fall back to latin-1
                            try:
                                return raw.decode("utf-8")
                            except UnicodeDecodeError:
                                return raw.decode("latin-1")
    except Exception as e:
        print(f"  [ZIP ERR] {e}")
    return None


def open_zip_all_txt(data: bytes) -> list[tuple[str, str]]:
    """Return list of (name, text) for all .txt/.csv files in zip."""
    results = []
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            for name in zf.namelist():
                if name.lower().endswith((".txt", ".csv")) and not name.startswith("__"):
                    with zf.open(name) as f:
                        raw = f.read()
                        try:
                            text = raw.decode("utf-8")
                        except UnicodeDecodeError:
                            text = raw.decode("latin-1")
                        results.append((name, text))
    except Exception as e:
        print(f"  [ZIP ERR] {e}")
    return results


# ─── Schema ───────────────────────────────────────────────────────────────────

SCHEMA = """
CREATE TABLE IF NOT EXISTS icd10_codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    billable INTEGER DEFAULT 1,
    effective_date TEXT DEFAULT '2026-01-01'
);
CREATE INDEX IF NOT EXISTS idx_icd10_desc ON icd10_codes(description);

CREATE TABLE IF NOT EXISTS hcpcs_codes (
    code TEXT PRIMARY KEY,
    long_description TEXT,
    short_description TEXT,
    category TEXT,
    price_indicator TEXT,
    multiple_pricing TEXT,
    coverage_code TEXT,
    effective_date TEXT,
    termination_date TEXT
);
CREATE INDEX IF NOT EXISTS idx_hcpcs_desc ON hcpcs_codes(long_description);

CREATE TABLE IF NOT EXISTS cpt_rvu (
    code TEXT PRIMARY KEY,
    description TEXT,
    status_code TEXT,
    work_rvu REAL,
    pe_rvu_nonfacility REAL,
    pe_rvu_facility REAL,
    mp_rvu REAL,
    total_rvu_nonfacility REAL,
    total_rvu_facility REAL,
    global_days TEXT,
    preop_pct REAL,
    intraop_pct REAL,
    postop_pct REAL,
    bilateral_surgery TEXT,
    assistant_surgery TEXT,
    co_surgery TEXT,
    team_surgery TEXT,
    effective_date TEXT DEFAULT '2026-01-01'
);
CREATE INDEX IF NOT EXISTS idx_cpt_desc ON cpt_rvu(description);

CREATE TABLE IF NOT EXISTS ncci_ptp_edits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    col1_code TEXT NOT NULL,
    col2_code TEXT NOT NULL,
    modifier_indicator TEXT,
    effective_date TEXT,
    deletion_date TEXT
);
CREATE INDEX IF NOT EXISTS idx_ncci_col1 ON ncci_ptp_edits(col1_code);
CREATE INDEX IF NOT EXISTS idx_ncci_col2 ON ncci_ptp_edits(col2_code);
CREATE INDEX IF NOT EXISTS idx_ncci_pair ON ncci_ptp_edits(col1_code, col2_code);

CREATE TABLE IF NOT EXISTS ncci_mue_values (
    code TEXT PRIMARY KEY,
    mue_value INTEGER,
    mue_adjudication_indicator TEXT,
    effective_date TEXT
);

CREATE TABLE IF NOT EXISTS cdt_codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    subcategory TEXT,
    tooth_specific INTEGER DEFAULT 0,
    area_specific INTEGER DEFAULT 0,
    surface_specific INTEGER DEFAULT 0,
    effective_date TEXT DEFAULT '2025-01-01'
);
CREATE INDEX IF NOT EXISTS idx_cdt_desc ON cdt_codes(description);
CREATE INDEX IF NOT EXISTS idx_cdt_cat ON cdt_codes(category);

CREATE TABLE IF NOT EXISTS place_of_service (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS modifiers (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    applicable_to TEXT,
    category TEXT
);

CREATE TABLE IF NOT EXISTS revenue_codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    subcategory TEXT
);

CREATE TABLE IF NOT EXISTS carc_codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    effective_date TEXT
);

CREATE TABLE IF NOT EXISTS rarc_codes (
    code TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    effective_date TEXT
);

CREATE TABLE IF NOT EXISTS taxonomy_codes (
    code TEXT PRIMARY KEY,
    grouping TEXT,
    classification TEXT,
    specialization TEXT,
    definition TEXT,
    effective_date TEXT
);
CREATE INDEX IF NOT EXISTS idx_tax_class ON taxonomy_codes(classification);

CREATE TABLE IF NOT EXISTS payer_policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payer TEXT NOT NULL,
    code TEXT NOT NULL,
    policy_type TEXT,
    description TEXT,
    modifier_required TEXT,
    effective_date TEXT
);
CREATE INDEX IF NOT EXISTS idx_pp_payer ON payer_policies(payer);
CREATE INDEX IF NOT EXISTS idx_pp_code ON payer_policies(code);

CREATE TABLE IF NOT EXISTS refresh_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    source_url TEXT,
    downloaded_at TEXT,
    record_count INTEGER,
    version TEXT
);
"""


def init_db(db_path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(str(db_path))
    conn.executescript(SCHEMA)
    conn.commit()
    print(f"[DB] Initialized: {db_path}")
    return conn


def log_refresh(conn, table_name, source_url, record_count, version):
    conn.execute(
        "INSERT INTO refresh_log (table_name, source_url, downloaded_at, record_count, version) VALUES (?,?,?,?,?)",
        (table_name, source_url, datetime.utcnow().isoformat(), record_count, version),
    )
    conn.commit()


# ─── ICD-10-CM ────────────────────────────────────────────────────────────────

def load_icd10(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse ICD-10-CM code description file and load into DB."""
    print("[ICD-10-CM] Parsing...")

    # Try to get the codes file from zip
    text = open_zip_member(data, [r"icd10cm.*codes.*\.txt$", r"codes.*\.txt$", r"icd10cm.*\.txt$"])

    if not text:
        # Try all txt files
        all_txt = open_zip_all_txt(data)
        for name, content in all_txt:
            if "code" in name.lower() or "icd" in name.lower():
                text = content
                print(f"  [ICD-10] Using file: {name}")
                break
        if not text and all_txt:
            text = all_txt[0][1]
            print(f"  [ICD-10] Using first txt: {all_txt[0][0]}")

    if not text:
        print("[ICD-10-CM] ERROR: Could not extract text file from zip")
        return 0

    rows = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        # Format: CODE<whitespace>DESCRIPTION
        # ICD-10-CM codes are 3-7 chars, alphanumeric
        parts = line.split(None, 1)
        if len(parts) < 2:
            continue
        code, desc = parts[0].strip(), parts[1].strip()
        if not re.match(r'^[A-Z][0-9A-Z]{2,6}$', code):
            continue
        # Billable = 7 chars (most specific) or known billable pattern
        billable = 1 if len(code) >= 4 else 0
        # Category = first 3 chars
        category = code[:3]
        rows.append((code, desc, category, billable, "2026-01-01"))

    if not rows:
        print("[ICD-10-CM] ERROR: No codes parsed")
        return 0

    conn.execute("DELETE FROM icd10_codes")
    conn.executemany(
        "INSERT OR REPLACE INTO icd10_codes (code, description, category, billable, effective_date) VALUES (?,?,?,?,?)",
        rows,
    )
    conn.commit()
    log_refresh(conn, "icd10_codes", SOURCES["icd10_cm"]["url"], len(rows), version)
    print(f"[ICD-10-CM] Loaded {len(rows):,} codes")
    return len(rows)


# ─── HCPCS Level II ───────────────────────────────────────────────────────────

def load_hcpcs(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse HCPCS Level II alpha-numeric file."""
    print("[HCPCS] Parsing...")

    all_txt = open_zip_all_txt(data)
    text = None
    for name, content in all_txt:
        # The main HCPCS file is typically named HCPC<year>.txt or similar
        if re.search(r'hcpc|anweb|alpha', name, re.IGNORECASE):
            text = content
            print(f"  [HCPCS] Using file: {name}")
            break
    if not text and all_txt:
        # Use largest file
        text = max(all_txt, key=lambda x: len(x[1]))[1]
        print(f"  [HCPCS] Using largest file")

    if not text:
        print("[HCPCS] ERROR: No text file found")
        return 0

    rows = []
    for line in text.splitlines():
        if not line.strip():
            continue
        # HCPCS fixed-width format:
        # Cols 1-5: HCPCS code
        # Cols 6: sequence number or space
        # Cols 7-14: various indicators
        # Then description fields
        # Try tab-delimited first
        if '\t' in line:
            parts = line.split('\t')
            if len(parts) >= 2:
                code = parts[0].strip()
                desc = parts[1].strip() if len(parts) > 1 else ""
                short_desc = parts[2].strip() if len(parts) > 2 else ""
                if re.match(r'^[A-Z][0-9]{4}$', code):
                    category = _hcpcs_category(code)
                    rows.append((code, desc, short_desc, category, "", "", "", "2026-01-01", ""))
        else:
            # Fixed-width: code is first 5 chars
            if len(line) >= 5:
                code = line[:5].strip()
                if re.match(r'^[A-Z][0-9]{4}$', code):
                    desc = line[5:].strip() if len(line) > 5 else ""
                    category = _hcpcs_category(code)
                    rows.append((code, desc, "", category, "", "", "", "2026-01-01", ""))

    if not rows:
        print("[HCPCS] ERROR: No codes parsed — trying alternate parse")
        # Try CSV-style
        for line in text.splitlines():
            parts = [p.strip().strip('"') for p in line.split(',')]
            if len(parts) >= 2:
                code = parts[0].strip()
                if re.match(r'^[A-Z][0-9]{4}$', code):
                    desc = parts[1] if len(parts) > 1 else ""
                    short_desc = parts[2] if len(parts) > 2 else ""
                    category = _hcpcs_category(code)
                    rows.append((code, desc, short_desc, category, "", "", "", "2026-01-01", ""))

    conn.execute("DELETE FROM hcpcs_codes")
    conn.executemany(
        """INSERT OR REPLACE INTO hcpcs_codes
           (code, long_description, short_description, category, price_indicator,
            multiple_pricing, coverage_code, effective_date, termination_date)
           VALUES (?,?,?,?,?,?,?,?,?)""",
        rows,
    )
    conn.commit()
    log_refresh(conn, "hcpcs_codes", SOURCES["hcpcs"]["url"], len(rows), version)
    print(f"[HCPCS] Loaded {len(rows):,} codes")
    return len(rows)


def _hcpcs_category(code: str) -> str:
    prefix = code[0]
    cats = {
        'A': 'Transportation/Medical/Surgical Supplies',
        'B': 'Enteral/Parenteral Therapy',
        'C': 'Outpatient PPS',
        'D': 'Dental Procedures',
        'E': 'Durable Medical Equipment',
        'G': 'Procedures/Professional Services',
        'H': 'Behavioral Health',
        'J': 'Drugs Administered Other Than Oral',
        'K': 'Temporary Codes (DME MACs)',
        'L': 'Orthotic/Prosthetic Procedures',
        'M': 'Medical Services',
        'P': 'Pathology/Laboratory',
        'Q': 'Temporary Codes',
        'R': 'Diagnostic Radiology',
        'S': 'Temporary National Codes (Non-Medicare)',
        'T': 'State Medicaid Agency Codes',
        'U': 'Coronavirus Diagnostic Tests',
        'V': 'Vision/Hearing/Speech-Language',
    }
    return cats.get(prefix, 'Other')


# ─── NCCI PTP Edits ───────────────────────────────────────────────────────────

def load_ncci_ptp(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse NCCI PTP practitioner edits."""
    print("[NCCI PTP] Parsing...")

    all_txt = open_zip_all_txt(data)
    if not all_txt:
        print("[NCCI PTP] ERROR: No files in zip")
        return 0

    total_rows = 0
    conn.execute("DELETE FROM ncci_ptp_edits")

    for name, text in all_txt:
        if not re.search(r'pract|physician|part_b', name, re.IGNORECASE):
            if len(all_txt) > 1:
                continue  # skip non-practitioner files if we have choices

        rows = []
        for line in text.splitlines():
            line = line.strip()
            if not line or line.startswith('#') or line.lower().startswith('col'):
                continue
            # Format varies: tab or fixed-width
            # Typical: COL1_CODE  COL2_CODE  MODIFIER_IND  EFFECTIVE_DATE  DELETION_DATE
            parts = re.split(r'\s+|\t', line)
            if len(parts) >= 3:
                col1 = parts[0].strip()
                col2 = parts[1].strip()
                mod_ind = parts[2].strip() if len(parts) > 2 else "0"
                eff_date = parts[3].strip() if len(parts) > 3 else ""
                del_date = parts[4].strip() if len(parts) > 4 else ""
                # Validate: CPT/HCPCS codes are 5 chars
                if re.match(r'^[0-9A-Z]{5}$', col1) and re.match(r'^[0-9A-Z]{5}$', col2):
                    rows.append((col1, col2, mod_ind, eff_date, del_date))

        if rows:
            conn.executemany(
                "INSERT INTO ncci_ptp_edits (col1_code, col2_code, modifier_indicator, effective_date, deletion_date) VALUES (?,?,?,?,?)",
                rows,
            )
            conn.commit()
            total_rows += len(rows)
            print(f"  [NCCI PTP] {name}: {len(rows):,} edits")

    log_refresh(conn, "ncci_ptp_edits", SOURCES["ncci_ptp"]["url"], total_rows, version)
    print(f"[NCCI PTP] Total: {total_rows:,} edit pairs")
    return total_rows


# ─── NCCI MUE ─────────────────────────────────────────────────────────────────

def load_ncci_mue(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse NCCI MUE practitioner values."""
    print("[NCCI MUE] Parsing...")

    all_txt = open_zip_all_txt(data)
    if not all_txt:
        print("[NCCI MUE] ERROR: No files in zip")
        return 0

    rows = []
    for name, text in all_txt:
        for line in text.splitlines():
            line = line.strip()
            if not line or line.startswith('#') or line.lower().startswith('hcpcs') or line.lower().startswith('code'):
                continue
            parts = re.split(r'\s+|\t|,', line)
            if len(parts) >= 2:
                code = parts[0].strip().strip('"')
                mue_val = parts[1].strip().strip('"')
                adj_ind = parts[2].strip().strip('"') if len(parts) > 2 else ""
                eff_date = parts[3].strip().strip('"') if len(parts) > 3 else ""
                if re.match(r'^[0-9A-Z]{5}$', code):
                    try:
                        mue_int = int(mue_val)
                        rows.append((code, mue_int, adj_ind, eff_date))
                    except ValueError:
                        pass

    if not rows:
        print("[NCCI MUE] ERROR: No MUE values parsed")
        return 0

    conn.execute("DELETE FROM ncci_mue_values")
    conn.executemany(
        "INSERT OR REPLACE INTO ncci_mue_values (code, mue_value, mue_adjudication_indicator, effective_date) VALUES (?,?,?,?)",
        rows,
    )
    conn.commit()
    log_refresh(conn, "ncci_mue_values", SOURCES["ncci_mue"]["url"], len(rows), version)
    print(f"[NCCI MUE] Loaded {len(rows):,} MUE values")
    return len(rows)


# ─── Medicare PFS RVU ─────────────────────────────────────────────────────────

def load_rvu(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse Medicare PFS RVU file."""
    print("[RVU] Parsing...")

    all_txt = open_zip_all_txt(data)
    if not all_txt:
        print("[RVU] ERROR: No files in zip")
        return 0

    # RVU file is typically the largest .txt file
    text = max(all_txt, key=lambda x: len(x[1]))[1]
    print(f"  [RVU] Using largest file ({len(text):,} chars)")

    rows = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        # RVU file is tab-delimited
        # Columns (approximate): HCPCS, MOD, DESC, STATUS, WORK_RVU, NF_PE_RVU, F_PE_RVU, MP_RVU,
        #   NF_TOTAL, F_TOTAL, PCTC_IND, GLOB_DAYS, PRE_PCT, INTRA_PCT, POST_PCT,
        #   MULT_PROC, BILAT_SURG, ASST_SURG, CO_SURG, TEAM_SURG, ...
        parts = line.split('\t')
        if len(parts) < 8:
            # Try fixed-width or space-delimited
            parts = line.split()
        if len(parts) < 5:
            continue

        code = parts[0].strip()
        if not re.match(r'^[0-9]{5}$|^[A-Z][0-9]{4}$', code):
            continue

        def safe_float(s):
            try:
                return float(s.strip())
            except (ValueError, AttributeError):
                return None

        def safe_str(s):
            return s.strip() if s else ""

        # Try to extract key fields
        try:
            if len(parts) >= 20:
                desc = safe_str(parts[2]) if len(parts) > 2 else ""
                status = safe_str(parts[3]) if len(parts) > 3 else ""
                work_rvu = safe_float(parts[4]) if len(parts) > 4 else None
                nf_pe = safe_float(parts[5]) if len(parts) > 5 else None
                f_pe = safe_float(parts[6]) if len(parts) > 6 else None
                mp_rvu = safe_float(parts[7]) if len(parts) > 7 else None
                nf_total = safe_float(parts[8]) if len(parts) > 8 else None
                f_total = safe_float(parts[9]) if len(parts) > 9 else None
                glob_days = safe_str(parts[11]) if len(parts) > 11 else ""
                pre_pct = safe_float(parts[12]) if len(parts) > 12 else None
                intra_pct = safe_float(parts[13]) if len(parts) > 13 else None
                post_pct = safe_float(parts[14]) if len(parts) > 14 else None
                bilat = safe_str(parts[16]) if len(parts) > 16 else ""
                asst = safe_str(parts[17]) if len(parts) > 17 else ""
                co_surg = safe_str(parts[18]) if len(parts) > 18 else ""
                team = safe_str(parts[19]) if len(parts) > 19 else ""
            else:
                desc = safe_str(parts[2]) if len(parts) > 2 else ""
                status = safe_str(parts[3]) if len(parts) > 3 else ""
                work_rvu = safe_float(parts[4]) if len(parts) > 4 else None
                nf_pe = safe_float(parts[5]) if len(parts) > 5 else None
                f_pe = safe_float(parts[6]) if len(parts) > 6 else None
                mp_rvu = safe_float(parts[7]) if len(parts) > 7 else None
                nf_total = None
                f_total = None
                glob_days = ""
                pre_pct = None
                intra_pct = None
                post_pct = None
                bilat = ""
                asst = ""
                co_surg = ""
                team = ""

            rows.append((
                code, desc, status, work_rvu, nf_pe, f_pe, mp_rvu,
                nf_total, f_total, glob_days, pre_pct, intra_pct, post_pct,
                bilat, asst, co_surg, team, "2026-01-01"
            ))
        except Exception:
            continue

    if not rows:
        print("[RVU] ERROR: No RVU rows parsed")
        return 0

    conn.execute("DELETE FROM cpt_rvu")
    conn.executemany(
        """INSERT OR REPLACE INTO cpt_rvu
           (code, description, status_code, work_rvu, pe_rvu_nonfacility, pe_rvu_facility,
            mp_rvu, total_rvu_nonfacility, total_rvu_facility, global_days,
            preop_pct, intraop_pct, postop_pct, bilateral_surgery, assistant_surgery,
            co_surgery, team_surgery, effective_date)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        rows,
    )
    conn.commit()
    log_refresh(conn, "cpt_rvu", SOURCES["rvu"]["url"], len(rows), version)
    print(f"[RVU] Loaded {len(rows):,} procedure codes with RVU data")
    return len(rows)


# ─── NUCC Taxonomy ────────────────────────────────────────────────────────────

def load_taxonomy(conn: sqlite3.Connection, data: bytes, version: str):
    """Parse NUCC provider taxonomy CSV."""
    print("[TAXONOMY] Parsing...")

    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        text = data.decode("latin-1")

    rows = []
    lines = text.splitlines()
    # Skip header
    for line in lines[1:]:
        if not line.strip():
            continue
        parts = [p.strip().strip('"') for p in line.split(',')]
        if len(parts) >= 4:
            code = parts[0].strip()
            if not re.match(r'^[0-9]{9}[A-Z]$', code):
                continue
            grouping = parts[1] if len(parts) > 1 else ""
            classification = parts[2] if len(parts) > 2 else ""
            specialization = parts[3] if len(parts) > 3 else ""
            definition = parts[4] if len(parts) > 4 else ""
            rows.append((code, grouping, classification, specialization, definition, "2024-04-01"))

    if not rows:
        print("[TAXONOMY] ERROR: No taxonomy codes parsed")
        return 0

    conn.execute("DELETE FROM taxonomy_codes")
    conn.executemany(
        "INSERT OR REPLACE INTO taxonomy_codes (code, grouping, classification, specialization, definition, effective_date) VALUES (?,?,?,?,?,?)",
        rows,
    )
    conn.commit()
    log_refresh(conn, "taxonomy_codes", SOURCES["taxonomy"]["url"], len(rows), version)
    print(f"[TAXONOMY] Loaded {len(rows):,} taxonomy codes")
    return len(rows)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Download and load medical coding databases")
    parser.add_argument("--db", default=str(DEFAULT_DB), help="SQLite database path")
    parser.add_argument("--skip-download", action="store_true", help="Use cached files only")
    parser.add_argument("--only", nargs="+", choices=list(SOURCES.keys()), help="Only load specific sources")
    args = parser.parse_args()

    db_path = Path(args.db)
    conn = init_db(db_path)

    sources_to_run = args.only or list(SOURCES.keys())
    results = {}

    for key in sources_to_run:
        src = SOURCES[key]
        print(f"\n{'='*60}")
        print(f"[{key.upper()}] {src['description']}")
        print(f"{'='*60}")

        cache_path = CACHE_DIR / f"{key}_{src['version']}.cache"

        if args.skip_download and not cache_path.exists():
            print(f"  [SKIP] No cache for {key}")
            continue

        data = download_file(src["url"], cache_path, src.get("fallback"))
        if not data:
            print(f"  [FAIL] Could not download {key}")
            results[key] = 0
            continue

        # Dispatch to loader
        loaders = {
            "icd10_cm": load_icd10,
            "hcpcs": load_hcpcs,
            "ncci_ptp": load_ncci_ptp,
            "ncci_mue": load_ncci_mue,
            "rvu": load_rvu,
            "taxonomy": load_taxonomy,
        }

        loader = loaders.get(key)
        if loader:
            count = loader(conn, data, src["version"])
            results[key] = count
        else:
            print(f"  [SKIP] No loader for {key}")

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    total = 0
    for key, count in results.items():
        print(f"  {key:20s}: {count:>10,} records")
        total += count
    print(f"  {'TOTAL':20s}: {total:>10,} records")
    print(f"\nDatabase: {db_path}")
    print(f"Size: {db_path.stat().st_size / 1024 / 1024:.1f} MB")

    conn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
