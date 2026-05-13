"""
codes_service.py — Medical coding ground truth service layer.

Provides lookup, search, and validation functions backed by the
authoritative SQLite database (medical_codes.db) containing:
  - 74,719  ICD-10-CM FY2026 diagnosis codes
  - 8,727   HCPCS Level II July 2026 codes
  - 15,804  Medicare RVU26A procedure codes
  - 2,387,727 NCCI PTP edit pairs (Q2 2026)
  - 15,095  NCCI MUE values (Q2 2026)
  - 654     CDT dental codes (2025)
  - 52      CMS Place of Service codes
  - 114     CPT/HCPCS modifiers
  - 508     UB-04 revenue codes
  - 272     CARC claim adjustment reason codes
  - 459     RARC remittance advice remark codes
  - 82      NUCC taxonomy codes
"""

import sqlite3
import os
from pathlib import Path
from typing import Optional, List, Dict, Any
from functools import lru_cache

# ── DB path resolution ────────────────────────────────────────────────────────
_HERE = Path(__file__).resolve().parent
_DB_PATH = _HERE.parent.parent / "data" / "medical_codes.db"

# Allow override via env var for testing / Docker
DB_PATH = Path(os.environ.get("MEDICAL_CODES_DB", str(_DB_PATH)))


def _get_conn() -> sqlite3.Connection:
    """Return a thread-local SQLite connection with row_factory."""
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA query_only=ON")
    return conn


def _rows_to_dicts(rows) -> List[Dict[str, Any]]:
    return [dict(r) for r in rows]


# ── ICD-10-CM ─────────────────────────────────────────────────────────────────

def search_icd10(query: str, limit: int = 20) -> List[Dict]:
    """Full-text search across ICD-10-CM code and description."""
    q = query.strip().upper()
    conn = _get_conn()
    # Try exact code prefix first, then description LIKE
    rows = conn.execute(
        """SELECT code, description, category, is_billable
           FROM icd10_codes
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             code
           LIMIT ?""",
        (f"{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_icd10(code: str) -> Optional[Dict]:
    """Exact lookup of a single ICD-10-CM code."""
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM icd10_codes WHERE code = ?", (code.upper().strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def validate_icd10(code: str) -> Dict:
    """Validate an ICD-10-CM code. Returns validity + billability."""
    result = get_icd10(code)
    if not result:
        return {"valid": False, "billable": False, "code": code, "description": None}
    return {
        "valid": True,
        "billable": bool(result.get("is_billable", 1)),
        "code": result["code"],
        "description": result["description"],
        "category": result.get("category"),
    }


# ── HCPCS Level II ────────────────────────────────────────────────────────────

def search_hcpcs(query: str, limit: int = 20) -> List[Dict]:
    """Search HCPCS Level II codes by code or description."""
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, long_description, short_description, record_id,
                  effective_date, termination_date
           FROM hcpcs_codes
           WHERE code LIKE ? OR UPPER(long_description) LIKE ?
             OR UPPER(short_description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             code
           LIMIT ?""",
        (f"{q}%", f"%{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_hcpcs(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM hcpcs_codes WHERE code = ?", (code.upper().strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


# ── CPT / RVU ─────────────────────────────────────────────────────────────────

def search_cpt(query: str, limit: int = 20) -> List[Dict]:
    """Search CPT codes via Medicare RVU file (code + description)."""
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, description, work_rvu, pe_rvu_nonfacility,
                  pe_rvu_facility, mp_rvu, total_rvu_nonfacility,
                  total_rvu_facility, global_days, status_code
           FROM cpt_rvu
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             code
           LIMIT ?""",
        (f"{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_cpt_rvu(code: str) -> Optional[Dict]:
    """Get RVU data for a CPT/HCPCS code."""
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM cpt_rvu WHERE code = ?", (code.upper().strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def get_allowed_amount(code: str, conversion_factor: float = 32.7442) -> Optional[Dict]:
    """
    Estimate Medicare allowed amount from RVU data.
    Default CF = CY2026 Medicare Physician Fee Schedule conversion factor.
    """
    rvu = get_cpt_rvu(code)
    if not rvu:
        return None
    nf_total = rvu.get("non_facility_total_rvu")
    f_total = rvu.get("facility_total_rvu")
    return {
        "code": code,
        "non_facility_allowed": round(nf_total * conversion_factor, 2) if nf_total else None,
        "facility_allowed": round(f_total * conversion_factor, 2) if f_total else None,
        "conversion_factor": conversion_factor,
        "work_rvu": rvu.get("work_rvu"),
        "non_facility_total_rvu": nf_total,
        "facility_total_rvu": f_total,
        "global_days": rvu.get("global_days"),
    }


# ── CDT Dental ────────────────────────────────────────────────────────────────

def search_cdt(query: str, category: Optional[str] = None, limit: int = 20) -> List[Dict]:
    """Search CDT dental codes by code or description, optionally filtered by category."""
    q = query.strip().upper()
    conn = _get_conn()
    if category:
        rows = conn.execute(
            """SELECT code, description, category, subcategory,
                      tooth_specific, area_specific, surface_specific
               FROM cdt_codes
               WHERE (code LIKE ? OR UPPER(description) LIKE ?)
                 AND category = ?
               ORDER BY code LIMIT ?""",
            (f"{q}%", f"%{q}%", category, limit)
        ).fetchall()
    else:
        rows = conn.execute(
            """SELECT code, description, category, subcategory,
                      tooth_specific, area_specific, surface_specific
               FROM cdt_codes
               WHERE code LIKE ? OR UPPER(description) LIKE ?
               ORDER BY
                 CASE WHEN code = ? THEN 0
                      WHEN code LIKE ? THEN 1
                      ELSE 2 END,
                 code
               LIMIT ?""",
            (f"{q}%", f"%{q}%", q, f"{q}%", limit)
        ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_cdt(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM cdt_codes WHERE code = ?", (code.upper().strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def get_cdt_categories() -> List[str]:
    conn = _get_conn()
    rows = conn.execute(
        "SELECT DISTINCT category FROM cdt_codes ORDER BY category"
    ).fetchall()
    conn.close()
    return [r["category"] for r in rows]


# ── NCCI PTP Edits ────────────────────────────────────────────────────────────

def check_ncci_ptp(col1: str, col2: str) -> Dict:
    """
    Check if two procedure codes have an NCCI PTP edit.
    Returns edit details including modifier_indicator.
    modifier_indicator: 0=modifier cannot bypass, 1=modifier can bypass, 9=N/A
    """
    c1 = col1.strip().upper()
    c2 = col2.strip().upper()
    conn = _get_conn()
    # Check both orderings
    row = conn.execute(
        """SELECT col1_code, col2_code, modifier_indicator, effective_date, deletion_date
           FROM ncci_ptp_edits
           WHERE (col1_code = ? AND col2_code = ?) OR (col1_code = ? AND col2_code = ?)
           LIMIT 1""",
        (c1, c2, c2, c1)
    ).fetchone()
    conn.close()
    if not row:
        return {
            "edit_exists": False,
            "col1": c1,
            "col2": c2,
            "modifier_indicator": None,
            "modifier_can_bypass": None,
            "effective_date": None,
            "rationale": None,
        }
    mi = row["modifier_indicator"]
    return {
        "edit_exists": True,
        "col1": row["col1_code"],
        "col2": row["col2_code"],
        "modifier_indicator": mi,
        "modifier_can_bypass": (str(mi).strip() == "1"),
        "effective_date": row["effective_date"],
        "deletion_date": row["deletion_date"],
        "rationale": row["rationale"],
    }


def get_ncci_edits_for_code(code: str, limit: int = 100) -> List[Dict]:
    """Get all NCCI PTP edits where the given code appears as col1 (comprehensive code)."""
    conn = _get_conn()
    rows = conn.execute(
        """SELECT col1_code, col2_code, modifier_indicator, effective_date
           FROM ncci_ptp_edits
           WHERE col1_code = ?
           ORDER BY col2_code
           LIMIT ?""",
        (code.strip().upper(), limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def check_ncci_mue(code: str) -> Optional[Dict]:
    """Get the Medically Unlikely Edit (MUE) value for a procedure code."""
    conn = _get_conn()
    row = conn.execute(
        """SELECT code, mue_value, mue_adjudication_indicator
           FROM ncci_mue_values
           WHERE code = ?""",
        (code.strip().upper(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def validate_units_against_mue(code: str, units: int) -> Dict:
    """Validate billed units against MUE. Returns pass/fail with details."""
    mue = check_ncci_mue(code)
    if not mue:
        return {
            "code": code,
            "units_billed": units,
            "mue_value": None,
            "passes_mue": True,
            "message": "No MUE on file for this code",
        }
    mue_val = mue.get("mue_value")
    passes = (mue_val is None) or (units <= mue_val)
    return {
        "code": code,
        "units_billed": units,
        "mue_value": mue_val,
        "mue_adjudication_indicator": mue.get("mue_adjudication_indicator"),
        "mue_rationale": None,  # column not in DB schema
        "passes_mue": passes,
        "message": "OK" if passes else f"Units {units} exceed MUE of {mue_val}",
    }


# ── Place of Service ──────────────────────────────────────────────────────────

@lru_cache(maxsize=1)
def get_all_pos() -> List[Dict]:
    conn = _get_conn()
    rows = conn.execute(
        "SELECT code, name, description, facility_indicator FROM place_of_service ORDER BY code"
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_pos(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM place_of_service WHERE code = ?", (code.strip().zfill(2),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def is_facility_pos(code: str) -> bool:
    """Returns True if the POS is a facility setting (affects RVU calculation)."""
    pos = get_pos(code)
    return pos.get("facility_indicator", "N") == "Y" if pos else False


# ── Modifiers ─────────────────────────────────────────────────────────────────

@lru_cache(maxsize=1)
def get_all_modifiers() -> List[Dict]:
    conn = _get_conn()
    rows = conn.execute(
        "SELECT code, description, applicable_to, category, affects_payment, affects_bundling FROM modifiers ORDER BY code"
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_modifier(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM modifiers WHERE code = ?", (code.strip().upper(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def search_modifiers(query: str, limit: int = 20) -> List[Dict]:
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, description, applicable_to, category, affects_payment, affects_bundling
           FROM modifiers
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY code LIMIT ?""",
        (f"{q}%", f"%{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


# ── Revenue Codes ─────────────────────────────────────────────────────────────

def search_revenue_codes(query: str, limit: int = 20) -> List[Dict]:
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, description, subcategory
           FROM revenue_codes
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             code
           LIMIT ?""",
        (f"{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_revenue_code(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM revenue_codes WHERE code = ?", (code.strip().zfill(4),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


# ── CARC / RARC ───────────────────────────────────────────────────────────────

def search_carc(query: str, limit: int = 20) -> List[Dict]:
    """Search Claim Adjustment Reason Codes."""
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, description, category
           FROM carc_codes
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             CAST(code AS INTEGER)
           LIMIT ?""",
        (f"{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_carc(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM carc_codes WHERE code = ?", (code.strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def search_rarc(query: str, limit: int = 20) -> List[Dict]:
    """Search Remittance Advice Remark Codes."""
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, description, category
           FROM rarc_codes
           WHERE code LIKE ? OR UPPER(description) LIKE ?
           ORDER BY
             CASE WHEN code = ? THEN 0
                  WHEN code LIKE ? THEN 1
                  ELSE 2 END,
             code
           LIMIT ?""",
        (f"{q}%", f"%{q}%", q, f"{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_rarc(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM rarc_codes WHERE code = ?", (code.strip().upper(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


# ── Taxonomy ──────────────────────────────────────────────────────────────────

def search_taxonomy(query: str, limit: int = 20) -> List[Dict]:
    q = query.strip().upper()
    conn = _get_conn()
    rows = conn.execute(
        """SELECT code, grouping, classification, specialization, definition
           FROM taxonomy_codes
           WHERE code LIKE ? OR UPPER(classification) LIKE ?
             OR UPPER(specialization) LIKE ?
           ORDER BY code LIMIT ?""",
        (f"{q}%", f"%{q}%", f"%{q}%", limit)
    ).fetchall()
    conn.close()
    return _rows_to_dicts(rows)


def get_taxonomy(code: str) -> Optional[Dict]:
    conn = _get_conn()
    row = conn.execute(
        "SELECT * FROM taxonomy_codes WHERE code = ?", (code.strip(),)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


# ── Cross-code validation ─────────────────────────────────────────────────────

def validate_claim_line(
    procedure_code: str,
    diagnosis_codes: List[str],
    units: int = 1,
    modifier: Optional[str] = None,
    pos_code: Optional[str] = None,
    companion_codes: Optional[List[str]] = None,
) -> Dict:
    """
    Comprehensive single claim line validation:
    1. Procedure code exists (CPT/HCPCS)
    2. All diagnosis codes valid + billable
    3. Units within MUE
    4. NCCI PTP check against companion codes
    5. Modifier validity
    6. POS validity
    Returns structured result with issues list.
    """
    issues = []
    warnings = []

    # 1. Procedure code
    proc = get_cpt_rvu(procedure_code) or get_hcpcs(procedure_code)
    if not proc:
        issues.append({
            "type": "INVALID_PROCEDURE_CODE",
            "code": procedure_code,
            "message": f"Procedure code {procedure_code} not found in CPT/HCPCS database",
        })

    # 2. Diagnosis codes
    for dx in (diagnosis_codes or []):
        dx_result = validate_icd10(dx)
        if not dx_result["valid"]:
            issues.append({
                "type": "INVALID_DIAGNOSIS_CODE",
                "code": dx,
                "message": f"ICD-10-CM code {dx} not found",
            })
        elif not dx_result["billable"]:
            warnings.append({
                "type": "NON_BILLABLE_DIAGNOSIS",
                "code": dx,
                "message": f"ICD-10-CM code {dx} is a header/non-billable code",
            })

    # 3. MUE check
    mue_result = validate_units_against_mue(procedure_code, units)
    if not mue_result["passes_mue"]:
        issues.append({
            "type": "MUE_EXCEEDED",
            "code": procedure_code,
            "units_billed": units,
            "mue_value": mue_result["mue_value"],
            "message": mue_result["message"],
        })

    # 4. NCCI PTP checks
    ncci_issues = []
    for companion in (companion_codes or []):
        ptp = check_ncci_ptp(procedure_code, companion)
        if ptp["edit_exists"]:
            if not ptp["modifier_can_bypass"]:
                ncci_issues.append({
                    "type": "NCCI_PTP_HARD_EDIT",
                    "col1": ptp["col1"],
                    "col2": ptp["col2"],
                    "message": f"NCCI PTP edit: {ptp['col1']} and {ptp['col2']} cannot be billed together (modifier cannot bypass)",
                })
            else:
                if not modifier:
                    ncci_issues.append({
                        "type": "NCCI_PTP_SOFT_EDIT",
                        "col1": ptp["col1"],
                        "col2": ptp["col2"],
                        "message": f"NCCI PTP edit: {ptp['col1']} and {ptp['col2']} require a modifier to bypass",
                    })
                else:
                    warnings.append({
                        "type": "NCCI_PTP_BYPASSED",
                        "col1": ptp["col1"],
                        "col2": ptp["col2"],
                        "message": f"NCCI PTP edit bypassed with modifier {modifier}",
                    })
    issues.extend(ncci_issues)

    # 5. Modifier validity
    if modifier:
        mod = get_modifier(modifier)
        if not mod:
            warnings.append({
                "type": "UNKNOWN_MODIFIER",
                "code": modifier,
                "message": f"Modifier {modifier} not found in modifier database",
            })

    # 6. POS validity
    if pos_code:
        pos = get_pos(pos_code)
        if not pos:
            issues.append({
                "type": "INVALID_POS",
                "code": pos_code,
                "message": f"Place of service code {pos_code} not found",
            })

    return {
        "procedure_code": procedure_code,
        "valid": len(issues) == 0,
        "issues": issues,
        "warnings": warnings,
        "mue": mue_result,
        "rvu": get_allowed_amount(procedure_code) if proc else None,
    }


# ── DB health check ───────────────────────────────────────────────────────────

def get_db_stats() -> Dict:
    """Return record counts for all tables — used for health/status endpoint."""
    conn = _get_conn()
    tables = [
        "icd10_codes", "hcpcs_codes", "cpt_rvu", "ncci_ptp_edits",
        "ncci_mue_values", "cdt_codes", "place_of_service", "modifiers",
        "revenue_codes", "carc_codes", "rarc_codes", "taxonomy_codes",
    ]
    stats = {}
    for t in tables:
        try:
            stats[t] = conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
        except Exception:
            stats[t] = -1
    conn.close()
    stats["db_path"] = str(DB_PATH)
    stats["db_size_mb"] = round(DB_PATH.stat().st_size / 1024 / 1024, 1) if DB_PATH.exists() else 0
    return stats
