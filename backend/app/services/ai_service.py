"""
AI service — OpenAI for SOAP/analysis, AssemblyAI for transcription.
Falls back to rich mock data when keys absent.
"""
import httpx
from app.config import settings

# ── Mock data ─────────────────────────────────────────────────────────────────

MOCK_TRANSCRIPT = """
Doctor: Hi Sarah, it's Dr. Chen. How are you feeling today?
Patient: Not great, honestly. My lower back has been killing me.
Doctor: I'm sorry to hear that. How long has the pain been going on?
Patient: About two weeks. It's mostly a dull ache, but if I bend over it shoots down my left leg.
Doctor: Shooting down the leg. Does the pain reach past your knee?
Patient: Yes, all the way to my calf sometimes. And yesterday I had some numbness in my foot.
Doctor: Any weakness in the leg? Or loss of bowel or bladder control?
Patient: No weakness, and no issues like that.
Doctor: Okay. And just to check, have you had any chest pain or difficulty breathing?
Patient: Actually, yes. Last night I had sudden chest pain that wouldn't go away.
Doctor: Sarah, are you having any chest pain right now?
Patient: A little bit, yeah. It feels tight.
Doctor: Alright, because of the chest pain, I want you to go to the emergency room immediately to get an EKG.
"""

MOCK_AI_ANALYSIS = {
    "clinical_summary": (
        "Patient Sarah Johnson presents with a 2-week history of lower back pain with left-sided "
        "radiculopathy extending to the calf, accompanied by foot numbness. During the encounter, "
        "the patient disclosed acute chest tightness that began the previous evening. Given the "
        "cardiac risk, the provider appropriately escalated to emergency evaluation. Lumbar "
        "radiculopathy workup deferred pending cardiac clearance."
    ),
    "key_takeaways": [
        "Lower back pain with L4-L5 radiculopathy pattern — left leg radiation to calf with foot numbness.",
        "No bowel/bladder dysfunction — cauda equina syndrome ruled out at this time.",
        "Acute chest tightness onset last night — cardiac etiology must be excluded urgently.",
        "Provider correctly escalated to ED for EKG and cardiac workup before continuing MSK evaluation.",
        "Safety escalation protocol triggered on keyword 'chest pain' — documented in encounter record.",
    ],
    "action_items": [
        {"task": "Proceed to Emergency Room immediately for EKG and cardiac enzyme panel.", "assignee": "patient", "urgency": "high"},
        {"task": "Do not drive — arrange transport to ED.", "assignee": "patient", "urgency": "high"},
        {"task": "Order lumbar spine MRI (L-spine with/without contrast) once cardiac clearance obtained.", "assignee": "provider", "urgency": "medium"},
        {"task": "Review ED results and schedule follow-up within 48 hours.", "assignee": "provider", "urgency": "high"},
        {"task": "Consider neurology referral if radiculopathy persists post-cardiac workup.", "assignee": "provider", "urgency": "medium"},
    ],
    "recommended_follow_up": "48 hours (post-ED cardiac clearance)",
    "icd10_codes": ["M54.42", "G57.20", "R07.9", "M54.50"],
    "soap_note": (
        "S: Patient reports 2-week history of lower back pain, dull ache worsening with flexion, "
        "radiating down left leg to calf with foot numbness. Denies bowel/bladder changes. "
        "Discloses acute chest tightness onset last evening, currently present.\n\n"
        "O: Telehealth encounter. Neurological exam deferred. Cardiac exam deferred pending ED evaluation.\n\n"
        "A: 1. Lumbar radiculopathy, left L4-L5 distribution (M54.42). "
        "2. Acute chest pain — etiology undetermined, cardiac rule-out required (R07.9).\n\n"
        "P: 1. STAT ED referral for EKG and troponin. "
        "2. Lumbar MRI ordered pending cardiac clearance. "
        "3. Follow-up in 48 hours. "
        "4. Patient educated on red flag symptoms."
    ),
}

MOCK_SOAP_NOTE = {
    "subjective": "Patient reports 2-week history of lower back pain with left-sided radiation to calf and foot numbness. Denies bowel/bladder dysfunction. Discloses acute chest tightness onset last evening.",
    "objective": "Telehealth encounter. Neurological and cardiac exams deferred pending ED evaluation.",
    "assessment": "1. Lumbar radiculopathy, left L4-L5 distribution. 2. Acute chest pain — cardiac etiology must be excluded.",
    "plan": "1. STAT ED referral for EKG and troponin. 2. Lumbar MRI pending cardiac clearance. 3. Follow-up in 48 hours.",
    "icd10_codes": ["M54.42", "G57.20", "R07.9"],
    "cpt_codes": ["99214", "99213"],
    "safety_flags": ["Chest pain disclosed during encounter — emergency escalation triggered."],
}


# ── Transcription ─────────────────────────────────────────────────────────────

async def transcribe_audio(recording_url: str) -> str:
    """Transcribe audio via AssemblyAI. Returns mock transcript if key absent."""
    if not settings.transcription_mode:
        return MOCK_TRANSCRIPT

    import assemblyai as aai
    aai.settings.api_key = settings.ASSEMBLYAI_API_KEY
    config = aai.TranscriptionConfig(speaker_labels=True)
    transcriber = aai.Transcriber(config=config)
    transcript = transcriber.transcribe(recording_url)
    if transcript.status == aai.TranscriptStatus.error:
        raise RuntimeError(f"AssemblyAI error: {transcript.error}")

    lines = []
    if transcript.utterances:
        for utt in transcript.utterances:
            speaker = "Doctor" if utt.speaker == "A" else "Patient"
            lines.append(f"{speaker}: {utt.text}")
    else:
        lines.append(transcript.text or "")
    return "\n".join(lines)


# ── AI Analysis ───────────────────────────────────────────────────────────────

async def analyze_transcript(transcript: str) -> dict:
    """Run OpenAI analysis on transcript. Returns mock if key absent."""
    if not settings.ai_mode:
        return MOCK_AI_ANALYSIS

    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    system_prompt = """You are a clinical documentation AI for Clear Mind Life telehealth platform.
Analyze the provided medical encounter transcript and return a JSON object with EXACTLY these fields:
{
  "clinical_summary": "2-3 sentence objective summary of the encounter",
  "key_takeaways": ["array of 4-6 clinical observations"],
  "action_items": [
    {"task": "specific action", "assignee": "patient|provider", "urgency": "high|medium|low"}
  ],
  "recommended_follow_up": "timeframe string e.g. '1 week' or '48 hours'",
  "icd10_codes": ["list of relevant ICD-10 codes"],
  "soap_note": "full SOAP note as a single string with S/O/A/P sections"
}
Return ONLY valid JSON. No markdown, no explanation."""

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Transcript:\n{transcript}"},
        ],
        response_format={"type": "json_object"},
        temperature=0.2,
    )
    import json
    return json.loads(response.choices[0].message.content)


async def generate_soap_note(transcript_lines: list[dict]) -> dict:
    """Generate SOAP note from encounter transcript lines."""
    if not settings.ai_mode:
        return MOCK_SOAP_NOTE

    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    transcript_text = "\n".join(
        f"{line['speaker']}: {line['text']}" for line in transcript_lines
    )

    system_prompt = """You are a clinical documentation AI. Generate a structured SOAP note from the encounter transcript.
Return ONLY valid JSON with these exact fields:
{
  "subjective": "patient's chief complaint and history in their own words",
  "objective": "observable findings, vitals, exam results",
  "assessment": "clinical diagnosis and differential",
  "plan": "treatment plan, orders, referrals",
  "icd10_codes": ["relevant ICD-10 codes"],
  "cpt_codes": ["relevant CPT codes"],
  "safety_flags": ["any safety concerns identified"]
}"""

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Transcript:\n{transcript_text}"},
        ],
        response_format={"type": "json_object"},
        temperature=0.2,
    )
    import json
    return json.loads(response.choices[0].message.content)
