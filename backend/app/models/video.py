from pydantic import BaseModel
from typing import Optional


class CreateVideoRoomRequest(BaseModel):
    patientId: str
    providerId: str
    appointmentId: Optional[str] = None


class CreateVideoRoomResponse(BaseModel):
    success: bool
    room_id: str
    room_name: str
    disabled: bool
    created_at: str
    demo_mode: bool = False


class GenerateTokenRequest(BaseModel):
    room_id: str
    participant_name: str
    participant_role: str = "participant"  # "participant" | "moderator"


class GenerateTokenResponse(BaseModel):
    success: bool
    token: str
    room_id: str
    participant_name: str
    role: str
    demo_mode: bool = False


class StartRecordingRequest(BaseModel):
    room_id: str


class StartRecordingResponse(BaseModel):
    success: bool
    recording_id: str
    room_id: str
    demo_mode: bool = False


class StopRecordingRequest(BaseModel):
    room_id: str
    recording_id: str


class StopRecordingResponse(BaseModel):
    success: bool
    recording_id: str
    recording_url: Optional[str] = None
    demo_mode: bool = False


class TranscribeRequest(BaseModel):
    room_id: str
    recording_id: str
    recording_url: Optional[str] = None


class ActionItem(BaseModel):
    task: str
    assignee: str  # "patient" | "provider"
    urgency: str   # "high" | "medium" | "low"


class AIAnalysis(BaseModel):
    clinical_summary: str
    key_takeaways: list[str]
    action_items: list[ActionItem]
    recommended_follow_up: str
    icd10_codes: list[str] = []
    soap_note: Optional[str] = None


class TranscribeResponse(BaseModel):
    success: bool
    room_id: str
    recording_id: str
    transcript: Optional[str] = None
    ai_analysis: Optional[AIAnalysis] = None
    demo_mode: bool = False
