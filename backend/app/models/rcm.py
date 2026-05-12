from pydantic import BaseModel
from typing import Optional, List


# ── Eligibility ───────────────────────────────────────────────────────────────

class EligibilityRequest(BaseModel):
    patient_name: str
    date_of_birth: Optional[str] = None
    member_id: Optional[str] = None
    payer_name: Optional[str] = "BCBS"
    service_type: Optional[str] = "30"  # X12 service type code


class EligibilityResponse(BaseModel):
    success: bool
    patient_name: str
    payer_name: str
    coverage_status: str          # "ACTIVE" | "INACTIVE" | "UNKNOWN"
    copay: Optional[str] = None
    deductible_met: bool = False
    deductible_remaining: Optional[str] = None
    out_of_pocket_max: Optional[str] = None
    prior_auth_required: bool = False
    x12_270_snippet: str = ""
    x12_271_snippet: str = ""
    fhir_coverage_id: str = ""
    demo_mode: bool = False


# ── Billing / Claim Scrub ─────────────────────────────────────────────────────

class Claim(BaseModel):
    id: str
    patient: str
    payer: str
    amount: float
    codes: List[str]


class BillingScrubRequest(BaseModel):
    claims: List[Claim]


class ClaimResult(BaseModel):
    id: str
    patient: str
    payer: str
    amount: float
    codes: List[str]
    status: str           # "cleared" | "flagged"
    issue: Optional[str] = None
    fix: Optional[str] = None
    confidence: Optional[float] = None


class BillingScrubResponse(BaseModel):
    success: bool
    results: List[ClaimResult]
    total_claims: int
    flagged_count: int
    cleared_count: int
    demo_mode: bool = False


# ── Encounter / SOAP ──────────────────────────────────────────────────────────

class EncounterLine(BaseModel):
    speaker: str
    text: str


class EncounterSOAPRequest(BaseModel):
    transcript: List[EncounterLine]
    patient_name: Optional[str] = "Patient"
    provider_name: Optional[str] = "Provider"


class SOAPNote(BaseModel):
    subjective: str
    objective: str
    assessment: str
    plan: str
    icd10_codes: List[str]
    cpt_codes: List[str]
    safety_flags: List[str] = []


class EncounterSOAPResponse(BaseModel):
    success: bool
    soap_note: SOAPNote
    demo_mode: bool = False
