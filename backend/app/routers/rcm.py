"""
RCM (Revenue Cycle Management) API routes.
Eligibility, billing scrub, encounter SOAP generation.
"""
from fastapi import APIRouter, HTTPException
from app.models.rcm import (
    EligibilityRequest, EligibilityResponse,
    BillingScrubRequest, BillingScrubResponse, ClaimResult,
    EncounterSOAPRequest, EncounterSOAPResponse, SOAPNote,
)
from app.services import rcm_service, ai_service

router = APIRouter(prefix="/api/v1", tags=["rcm"])


@router.post("/eligibility/check", response_model=EligibilityResponse)
async def check_eligibility(req: EligibilityRequest):
    """Check insurance eligibility via X12 270/271 (demo mode)."""
    try:
        result = rcm_service.check_eligibility(
            patient_name=req.patient_name,
            date_of_birth=req.date_of_birth,
            member_id=req.member_id,
            payer_name=req.payer_name or "BCBS",
            service_type=req.service_type or "30",
        )
        return EligibilityResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/billing/scrub-claim", response_model=BillingScrubResponse)
async def scrub_claims(req: BillingScrubRequest):
    """Scrub claims against NCCI rules and payer-specific edits."""
    try:
        results = []
        for claim in req.claims:
            result = rcm_service.scrub_claim(
                claim_id=claim.id,
                patient=claim.patient,
                payer=claim.payer,
                amount=claim.amount,
                codes=claim.codes,
            )
            results.append(ClaimResult(**result))

        flagged = [r for r in results if r.status == "flagged"]
        cleared = [r for r in results if r.status == "cleared"]

        return BillingScrubResponse(
            success=True,
            results=results,
            total_claims=len(results),
            flagged_count=len(flagged),
            cleared_count=len(cleared),
            demo_mode=True,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/encounter/generate-note", response_model=EncounterSOAPResponse)
async def generate_soap_note(req: EncounterSOAPRequest):
    """Generate a SOAP note from an encounter transcript."""
    try:
        transcript_lines = [
            {"speaker": line.speaker, "text": line.text}
            for line in req.transcript
        ]
        soap_raw = await ai_service.generate_soap_note(transcript_lines)

        soap_note = SOAPNote(
            subjective=soap_raw.get("subjective", ""),
            objective=soap_raw.get("objective", ""),
            assessment=soap_raw.get("assessment", ""),
            plan=soap_raw.get("plan", ""),
            icd10_codes=soap_raw.get("icd10_codes", []),
            cpt_codes=soap_raw.get("cpt_codes", []),
            safety_flags=soap_raw.get("safety_flags", []),
        )

        return EncounterSOAPResponse(
            success=True,
            soap_note=soap_note,
            demo_mode=not ai_service.settings.ai_mode,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
