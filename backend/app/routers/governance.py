"""
Governance / AI Benchmark API routes.
Provides mock data for the governance dashboard when no EAIA backend is connected.
"""
import uuid
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/v1/governance", tags=["governance"])


# ── Mock data ─────────────────────────────────────────────────────────────────

MOCK_DOMAINS = [
    {"name": "healthcare_triage", "task_count": 24, "has_evaluators": True},
    {"name": "dental_intake", "task_count": 18, "has_evaluators": True},
    {"name": "billing_compliance", "task_count": 31, "has_evaluators": True},
    {"name": "clinical_documentation", "task_count": 15, "has_evaluators": True},
    {"name": "safety_escalation", "task_count": 12, "has_evaluators": True},
]

MOCK_STATS = {
    "registered_agents": 7,
    "certifications_run": 142,
    "global_pass_rate": 94.3,
    "traps_triggered": 8,
}

MOCK_HISTORICAL = [
    {
        "source": "db",
        "filename": "healthcare_triage_v2.json",
        "domain": "healthcare_triage",
        "timestamp": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
        "pass_rate": 96.2,
        "passed": 23,
        "failed": 1,
        "total_evaluations": 24,
    },
    {
        "source": "db",
        "filename": "billing_compliance_v3.json",
        "domain": "billing_compliance",
        "timestamp": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat(),
        "pass_rate": 93.5,
        "passed": 29,
        "failed": 2,
        "total_evaluations": 31,
    },
    {
        "source": "db",
        "filename": "safety_escalation_v1.json",
        "domain": "safety_escalation",
        "timestamp": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat(),
        "pass_rate": 100.0,
        "passed": 12,
        "failed": 0,
        "total_evaluations": 12,
    },
]

MOCK_DB_REPORTS = [
    {
        "run_id": "run_a1b2c3d4",
        "agent": "ClearMind Triage Agent v2",
        "domain": "healthcare_triage",
        "grade": "CERTIFIED",
        "overall_score": 96.2,
        "completed_at": (datetime.now(timezone.utc) - timedelta(hours=6)).isoformat(),
    },
    {
        "run_id": "run_e5f6g7h8",
        "agent": "Billing Compliance Agent v3",
        "domain": "billing_compliance",
        "grade": "CONDITIONAL",
        "overall_score": 87.1,
        "completed_at": (datetime.now(timezone.utc) - timedelta(hours=18)).isoformat(),
    },
    {
        "run_id": "run_i9j0k1l2",
        "agent": "Safety Escalation Agent v1",
        "domain": "safety_escalation",
        "grade": "CERTIFIED",
        "overall_score": 100.0,
        "completed_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
    },
]

# In-memory store for certification runs
_certification_runs: dict[str, dict] = {}


# ── Routes ────────────────────────────────────────────────────────────────────

@router.get("/domains")
async def get_domains():
    return {"domains": MOCK_DOMAINS}


@router.get("/stats")
async def get_stats():
    return MOCK_STATS


@router.get("/reports")
async def get_reports():
    return {
        "db_reports": MOCK_DB_REPORTS,
        "historical_reports": MOCK_HISTORICAL,
    }


class CertifyRequest(BaseModel):
    agent: str
    domain: str
    model: Optional[str] = "gpt-4o-mini"


@router.post("/certify")
async def start_certification(req: CertifyRequest):
    """Start a certification run (mock — simulates async processing)."""
    run_id = f"run_{uuid.uuid4().hex[:8]}"
    _certification_runs[run_id] = {
        "run_id": run_id,
        "agent": req.agent,
        "domain": req.domain,
        "model": req.model,
        "status": "running",
        "grade": None,
        "overall_score": None,
        "started_at": datetime.now(timezone.utc).isoformat(),
        "completed_at": None,
    }
    return {"run_id": run_id, "status": "running", "message": f"Certification started for {req.agent} on domain {req.domain}"}


@router.get("/certify/{run_id}")
async def get_certification_status(run_id: str):
    """Poll certification run status."""
    if run_id not in _certification_runs:
        raise HTTPException(status_code=404, detail=f"Run {run_id} not found")

    run = _certification_runs[run_id]

    # Simulate completion after first poll
    if run["status"] == "running":
        import random
        score = round(random.uniform(82.0, 99.5), 1)
        grade = "CERTIFIED" if score >= 90 else "CONDITIONAL" if score >= 75 else "FAILED"
        run.update({
            "status": "completed",
            "grade": grade,
            "overall_score": score,
            "completed_at": datetime.now(timezone.utc).isoformat(),
        })
        # Add to mock reports
        MOCK_DB_REPORTS.insert(0, {
            "run_id": run_id,
            "agent": run["agent"],
            "domain": run["domain"],
            "grade": grade,
            "overall_score": score,
            "completed_at": run["completed_at"],
        })
        MOCK_STATS["certifications_run"] += 1

    return run
