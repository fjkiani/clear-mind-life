"""
codes.py — FastAPI router for medical coding ground truth endpoints.

All endpoints are read-only lookups against the authoritative SQLite DB.
No authentication required (internal service endpoints).

Endpoints:
  GET /codes/icd10/search          — search ICD-10-CM by code or description
  GET /codes/icd10/{code}          — exact ICD-10-CM lookup
  GET /codes/icd10/{code}/validate — validate ICD-10-CM code
  GET /codes/hcpcs/search          — search HCPCS Level II
  GET /codes/hcpcs/{code}          — exact HCPCS lookup
  GET /codes/cpt/search            — search CPT/RVU codes
  GET /codes/cpt/{code}/rvu        — get RVU + allowed amount for CPT code
  GET /codes/cdt/search            — search CDT dental codes
  GET /codes/cdt/{code}            — exact CDT lookup
  GET /codes/cdt/categories        — list CDT categories
  GET /codes/ncci/ptp              — check NCCI PTP edit for two codes
  GET /codes/ncci/mue/{code}       — get MUE for a procedure code
  GET /codes/pos                   — list all Place of Service codes
  GET /codes/pos/{code}            — exact POS lookup
  GET /codes/modifiers/search      — search modifiers
  GET /codes/modifiers/{code}      — exact modifier lookup
  GET /codes/revenue/search        — search UB-04 revenue codes
  GET /codes/revenue/{code}        — exact revenue code lookup
  GET /codes/carc/search           — search CARC codes
  GET /codes/carc/{code}           — exact CARC lookup
  GET /codes/rarc/search           — search RARC codes
  GET /codes/rarc/{code}           — exact RARC lookup
  GET /codes/taxonomy/search       — search NUCC taxonomy codes
  POST /codes/validate/claim-line  — comprehensive claim line validation
  GET /codes/stats                 — DB health / record counts
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, List

from app.services import codes_service as svc

router = APIRouter(prefix="/codes", tags=["Medical Codes"])


# ── ICD-10-CM ─────────────────────────────────────────────────────────────────

@router.get("/icd10/search")
def search_icd10(
    q: str = Query(..., min_length=1, description="Code prefix or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search ICD-10-CM FY2026 codes by code prefix or description keyword."""
    return svc.search_icd10(q, limit=limit)


@router.get("/icd10/{code}")
def get_icd10(code: str):
    """Exact lookup of a single ICD-10-CM code."""
    result = svc.get_icd10(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"ICD-10-CM code '{code}' not found")
    return result


@router.get("/icd10/{code}/validate")
def validate_icd10(code: str):
    """Validate an ICD-10-CM code — returns validity and billability."""
    return svc.validate_icd10(code)


# ── HCPCS Level II ────────────────────────────────────────────────────────────

@router.get("/hcpcs/search")
def search_hcpcs(
    q: str = Query(..., min_length=1, description="Code prefix or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search HCPCS Level II July 2026 codes."""
    return svc.search_hcpcs(q, limit=limit)


@router.get("/hcpcs/{code}")
def get_hcpcs(code: str):
    """Exact lookup of a HCPCS Level II code."""
    result = svc.get_hcpcs(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"HCPCS code '{code}' not found")
    return result


# ── CPT / RVU ─────────────────────────────────────────────────────────────────

@router.get("/cpt/search")
def search_cpt(
    q: str = Query(..., min_length=1, description="Code prefix or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search CPT codes via Medicare RVU26A file."""
    return svc.search_cpt(q, limit=limit)


@router.get("/cpt/{code}/rvu")
def get_cpt_rvu(
    code: str,
    conversion_factor: float = Query(32.7442, description="Medicare CF (default CY2026)"),
):
    """Get RVU values and estimated Medicare allowed amount for a CPT code."""
    result = svc.get_allowed_amount(code, conversion_factor=conversion_factor)
    if not result:
        raise HTTPException(status_code=404, detail=f"CPT code '{code}' not found in RVU file")
    return result


# ── CDT Dental ────────────────────────────────────────────────────────────────

@router.get("/cdt/categories")
def get_cdt_categories():
    """List all CDT dental code categories."""
    return svc.get_cdt_categories()


@router.get("/cdt/search")
def search_cdt(
    q: str = Query(..., min_length=1, description="Code prefix or description keyword"),
    category: Optional[str] = Query(None, description="Filter by CDT category"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search CDT 2025 dental codes by code or description."""
    return svc.search_cdt(q, category=category, limit=limit)


@router.get("/cdt/{code}")
def get_cdt(code: str):
    """Exact lookup of a CDT dental code."""
    result = svc.get_cdt(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"CDT code '{code}' not found")
    return result


# ── NCCI ──────────────────────────────────────────────────────────────────────

@router.get("/ncci/ptp")
def check_ncci_ptp(
    col1: str = Query(..., description="Comprehensive (column 1) procedure code"),
    col2: str = Query(..., description="Component (column 2) procedure code"),
):
    """
    Check NCCI PTP edit between two procedure codes (Q2 2026).
    modifier_indicator: 0=modifier cannot bypass, 1=modifier can bypass, 9=N/A
    """
    return svc.check_ncci_ptp(col1, col2)


@router.get("/ncci/ptp/{code}/edits")
def get_ncci_edits_for_code(
    code: str,
    limit: int = Query(100, ge=1, le=500),
):
    """Get all NCCI PTP edits where the given code is the comprehensive (col1) code."""
    return svc.get_ncci_edits_for_code(code, limit=limit)


@router.get("/ncci/mue/{code}")
def check_ncci_mue(code: str):
    """Get the Medically Unlikely Edit (MUE) value for a procedure code."""
    result = svc.check_ncci_mue(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"No MUE found for code '{code}'")
    return result


@router.get("/ncci/mue/{code}/validate")
def validate_mue(
    code: str,
    units: int = Query(..., ge=1, description="Number of units billed"),
):
    """Validate billed units against the MUE for a procedure code."""
    return svc.validate_units_against_mue(code, units)


# ── Place of Service ──────────────────────────────────────────────────────────

@router.get("/pos")
def list_pos():
    """List all CMS Place of Service codes."""
    return svc.get_all_pos()


@router.get("/pos/{code}")
def get_pos(code: str):
    """Exact lookup of a Place of Service code."""
    result = svc.get_pos(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"POS code '{code}' not found")
    return result


# ── Modifiers ─────────────────────────────────────────────────────────────────

@router.get("/modifiers/search")
def search_modifiers(
    q: str = Query(..., min_length=1, description="Modifier code or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search CPT/HCPCS modifiers."""
    return svc.search_modifiers(q, limit=limit)


@router.get("/modifiers")
def list_modifiers():
    """List all modifiers."""
    return svc.get_all_modifiers()


@router.get("/modifiers/{code}")
def get_modifier(code: str):
    """Exact lookup of a modifier code."""
    result = svc.get_modifier(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"Modifier '{code}' not found")
    return result


# ── Revenue Codes ─────────────────────────────────────────────────────────────

@router.get("/revenue/search")
def search_revenue(
    q: str = Query(..., min_length=1, description="Revenue code or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search UB-04 revenue codes."""
    return svc.search_revenue_codes(q, limit=limit)


@router.get("/revenue/{code}")
def get_revenue(code: str):
    """Exact lookup of a UB-04 revenue code."""
    result = svc.get_revenue_code(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"Revenue code '{code}' not found")
    return result


# ── CARC ──────────────────────────────────────────────────────────────────────

@router.get("/carc/search")
def search_carc(
    q: str = Query(..., min_length=1, description="CARC code or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search Claim Adjustment Reason Codes (X12/WPC)."""
    return svc.search_carc(q, limit=limit)


@router.get("/carc/{code}")
def get_carc(code: str):
    """Exact lookup of a CARC code."""
    result = svc.get_carc(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"CARC code '{code}' not found")
    return result


# ── RARC ──────────────────────────────────────────────────────────────────────

@router.get("/rarc/search")
def search_rarc(
    q: str = Query(..., min_length=1, description="RARC code or description keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search Remittance Advice Remark Codes (CMS)."""
    return svc.search_rarc(q, limit=limit)


@router.get("/rarc/{code}")
def get_rarc(code: str):
    """Exact lookup of a RARC code."""
    result = svc.get_rarc(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"RARC code '{code}' not found")
    return result


# ── Taxonomy ──────────────────────────────────────────────────────────────────

@router.get("/taxonomy/search")
def search_taxonomy(
    q: str = Query(..., min_length=1, description="Taxonomy code or specialty keyword"),
    limit: int = Query(20, ge=1, le=100),
):
    """Search NUCC provider taxonomy codes."""
    return svc.search_taxonomy(q, limit=limit)


@router.get("/taxonomy/{code}")
def get_taxonomy(code: str):
    """Exact lookup of a NUCC taxonomy code."""
    result = svc.get_taxonomy(code)
    if not result:
        raise HTTPException(status_code=404, detail=f"Taxonomy code '{code}' not found")
    return result


# ── Comprehensive Claim Line Validation ───────────────────────────────────────

class ClaimLineRequest(BaseModel):
    procedure_code: str
    diagnosis_codes: List[str] = []
    units: int = 1
    modifier: Optional[str] = None
    pos_code: Optional[str] = None
    companion_codes: Optional[List[str]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "procedure_code": "99213",
                "diagnosis_codes": ["Z00.00", "J06.9"],
                "units": 1,
                "modifier": None,
                "pos_code": "11",
                "companion_codes": ["99214"],
            }
        }


@router.post("/validate/claim-line")
def validate_claim_line(req: ClaimLineRequest):
    """
    Comprehensive claim line validation:
    - Procedure code existence (CPT/HCPCS)
    - Diagnosis code validity and billability
    - MUE units check
    - NCCI PTP edit check against companion codes
    - Modifier validity
    - Place of service validity
    Returns structured result with issues and warnings.
    """
    return svc.validate_claim_line(
        procedure_code=req.procedure_code,
        diagnosis_codes=req.diagnosis_codes,
        units=req.units,
        modifier=req.modifier,
        pos_code=req.pos_code,
        companion_codes=req.companion_codes,
    )


# ── DB Stats / Health ─────────────────────────────────────────────────────────

@router.get("/stats")
def get_db_stats():
    """Return record counts for all medical code tables and DB size."""
    return svc.get_db_stats()
