"""
RCM service — eligibility checking, claim scrubbing.
All operations have rich demo mode fallbacks.
"""
import uuid
from app.config import settings


# ── NCCI / Payer rule database (simplified) ───────────────────────────────────

NCCI_RULES = [
    {
        "payer": "UHC",
        "trigger_codes": ["G2211"],
        "condition": lambda codes: "G2211" in codes and "25" not in " ".join(codes),
        "issue": "UHC LCD Policy prohibits G2211 without Modifier 25 on primary E/M.",
        "fix": "Append Modifier 25 to the primary E/M code (e.g., 99215-25).",
        "confidence": 98.4,
    },
    {
        "payer": "BCBS",
        "trigger_codes": ["99215", "99214"],
        "condition": lambda codes: any(c in codes for c in ["99215", "99214"]) and "25" in " ".join(codes) and "G2211" in codes,
        "issue": "BCBS bundles G2211 with high-complexity E/M when Modifier 25 is present.",
        "fix": "Remove G2211 or remove Modifier 25 — cannot bill both simultaneously under BCBS.",
        "confidence": 94.1,
    },
    {
        "payer": "Aetna",
        "trigger_codes": ["99213", "99212"],
        "condition": lambda codes: "99213" in codes and "99212" in codes,
        "issue": "Aetna does not allow same-day billing of 99212 and 99213 for the same patient.",
        "fix": "Bill only the highest-level E/M code for the encounter.",
        "confidence": 99.9,
    },
]


def scrub_claim(claim_id: str, patient: str, payer: str, amount: float, codes: list[str]) -> dict:
    """Apply NCCI rules to a single claim. Returns result dict."""
    payer_upper = payer.upper()

    for rule in NCCI_RULES:
        if rule["payer"].upper() in payer_upper or payer_upper in rule["payer"].upper():
            if rule["condition"](codes):
                return {
                    "id": claim_id,
                    "patient": patient,
                    "payer": payer,
                    "amount": amount,
                    "codes": codes,
                    "status": "flagged",
                    "issue": rule["issue"],
                    "fix": rule["fix"],
                    "confidence": rule["confidence"],
                }

    return {
        "id": claim_id,
        "patient": patient,
        "payer": payer,
        "amount": amount,
        "codes": codes,
        "status": "cleared",
        "issue": None,
        "fix": None,
        "confidence": None,
    }


# ── Eligibility ───────────────────────────────────────────────────────────────

# Realistic X12 270/271 snippets for demo
def _build_x12_270(patient_name: str, member_id: str, payer: str) -> str:
    parts = patient_name.upper().split()
    last = parts[-1] if parts else "JOHNSON"
    first = parts[0] if len(parts) > 1 else "SARAH"
    mid = member_id or "MBR123456789"
    return (
        f"ISA*00*          *00*          *ZZ*AV09311993     *ZZ*PAYERID        *260224*1435*^*00501*000000001*0*P*:\n"
        f"GS*HS*AV09311993*PAYERID*20260224*1435*1*X*005010X279A1\n"
        f"ST*270*0001*005010X279A1\n"
        f"BHT*0022*13*10001234*20260224*1435\n"
        f"HL*1**20*1\n"
        f"NM1*PR*2*{payer.upper()}*****PI*PAYERID\n"
        f"HL*2*1*21*1\n"
        f"NM1*1P*1*CHEN*MEI-LING****XX*1234567890\n"
        f"HL*3*2*22*0\n"
        f"TRN*1*93175-012547*9877281234\n"
        f"NM1*IL*1*{last}*{first}****MI*{mid}\n"
        f"DMG*D8*19850315*F\n"
        f"EQ*30\n"
        f"SE*13*0001\n"
        f"GE*1*1\n"
        f"IEA*1*000000001"
    )


def _build_x12_271(patient_name: str, payer: str, copay: str, deductible_met: bool) -> str:
    parts = patient_name.upper().split()
    last = parts[-1] if parts else "JOHNSON"
    first = parts[0] if len(parts) > 1 else "SARAH"
    ded_code = "1" if deductible_met else "0"
    return (
        f"ISA*00*          *00*          *ZZ*PAYERID        *ZZ*AV09311993     *260224*1436*^*00501*000000001*0*P*:\n"
        f"GS*HB*PAYERID*AV09311993*20260224*1436*1*X*005010X279A1\n"
        f"ST*271*0001*005010X279A1\n"
        f"BHT*0022*11*10001234*20260224*1436\n"
        f"HL*1**20*1\n"
        f"NM1*PR*2*{payer.upper()}*****PI*PAYERID\n"
        f"HL*2*1*21*1\n"
        f"NM1*1P*1*CHEN*MEI-LING****XX*1234567890\n"
        f"HL*3*2*22*0\n"
        f"NM1*IL*1*{last}*{first}****MI*MBR123456789\n"
        f"DMG*D8*19850315*F\n"
        f"EB*1*IND*30**{copay.replace('$','')}\n"
        f"EB*C*IND*30\n"
        f"MSG*DEDUCTIBLE MET: {'YES' if deductible_met else 'NO'}\n"
        f"SE*15*0001\n"
        f"GE*1*1\n"
        f"IEA*1*000000001"
    )


# Payer-specific demo responses
PAYER_PROFILES = {
    "BCBS": {"copay": "$25.00", "deductible_met": True, "deductible_remaining": "$0.00", "oop_max": "$3,500.00", "prior_auth": False},
    "AETNA": {"copay": "$30.00", "deductible_met": False, "deductible_remaining": "$850.00", "oop_max": "$5,000.00", "prior_auth": False},
    "UHC": {"copay": "$40.00", "deductible_met": False, "deductible_remaining": "$1,200.00", "oop_max": "$6,000.00", "prior_auth": True},
    "CIGNA": {"copay": "$35.00", "deductible_met": True, "deductible_remaining": "$0.00", "oop_max": "$4,000.00", "prior_auth": False},
    "HUMANA": {"copay": "$20.00", "deductible_met": False, "deductible_remaining": "$500.00", "oop_max": "$4,500.00", "prior_auth": False},
    "MEDICARE": {"copay": "$0.00", "deductible_met": True, "deductible_remaining": "$0.00", "oop_max": "N/A", "prior_auth": False},
    "MEDICAID": {"copay": "$0.00", "deductible_met": True, "deductible_remaining": "$0.00", "oop_max": "N/A", "prior_auth": True},
}


def check_eligibility(
    patient_name: str,
    date_of_birth: str | None,
    member_id: str | None,
    payer_name: str,
    service_type: str,
) -> dict:
    """Check insurance eligibility. Always returns demo data (no live clearinghouse)."""
    payer_key = payer_name.upper().replace(" ", "").replace("-", "")
    # Fuzzy match payer
    profile = None
    for key, val in PAYER_PROFILES.items():
        if key in payer_key or payer_key in key:
            profile = val
            break
    if not profile:
        profile = PAYER_PROFILES["BCBS"]  # default

    mid = member_id or f"MBR{uuid.uuid4().hex[:9].upper()}"
    x270 = _build_x12_270(patient_name, mid, payer_name)
    x271 = _build_x12_271(patient_name, payer_name, profile["copay"], profile["deductible_met"])

    return {
        "success": True,
        "patient_name": patient_name,
        "payer_name": payer_name,
        "coverage_status": "ACTIVE",
        "copay": profile["copay"],
        "deductible_met": profile["deductible_met"],
        "deductible_remaining": profile["deductible_remaining"],
        "out_of_pocket_max": profile["oop_max"],
        "prior_auth_required": profile["prior_auth"],
        "x12_270_snippet": x270,
        "x12_271_snippet": x271,
        "fhir_coverage_id": f"Coverage/{uuid.uuid4().hex[:8]}",
        "demo_mode": True,
    }
