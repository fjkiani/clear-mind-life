"""
Video consultation API routes.
"""
from fastapi import APIRouter, HTTPException
from app.models.video import (
    CreateVideoRoomRequest, CreateVideoRoomResponse,
    GenerateTokenRequest, GenerateTokenResponse,
    StartRecordingRequest, StartRecordingResponse,
    StopRecordingRequest, StopRecordingResponse,
    TranscribeRequest, TranscribeResponse,
    AIAnalysis, ActionItem,
)
from app.services import videosdk_service, ai_service

router = APIRouter(prefix="/api/v1", tags=["video"])


@router.post("/demo/healthcare/create-video-room", response_model=CreateVideoRoomResponse)
async def create_video_room(req: CreateVideoRoomRequest):
    """Create a VideoSDK telehealth room."""
    try:
        result = await videosdk_service.create_video_room(
            req.patientId, req.providerId, req.appointmentId
        )
        return CreateVideoRoomResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/video/generate-token", response_model=GenerateTokenResponse)
async def generate_token(req: GenerateTokenRequest):
    """Generate a VideoSDK participant token."""
    try:
        result = await videosdk_service.generate_token(
            req.room_id, req.participant_name, req.participant_role
        )
        return GenerateTokenResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/video/recordings/start", response_model=StartRecordingResponse)
async def start_recording(req: StartRecordingRequest):
    """Start recording a VideoSDK room."""
    try:
        result = await videosdk_service.start_recording(req.room_id)
        return StartRecordingResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/video/recordings/stop", response_model=StopRecordingResponse)
async def stop_recording(req: StopRecordingRequest):
    """Stop recording a VideoSDK room."""
    try:
        result = await videosdk_service.stop_recording(req.room_id, req.recording_id)
        return StopRecordingResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/video/transcribe-recording", response_model=TranscribeResponse)
async def transcribe_recording(req: TranscribeRequest):
    """Transcribe a recording and run AI clinical analysis."""
    try:
        # Step 1: Transcribe audio
        recording_url = req.recording_url or "https://videosdk.live/mock_recording.mp4"
        transcript = await ai_service.transcribe_audio(recording_url)

        # Step 2: AI analysis
        analysis_raw = await ai_service.analyze_transcript(transcript)

        # Step 3: Coerce action_items to ActionItem objects
        action_items = [
            ActionItem(**item) if isinstance(item, dict) else item
            for item in analysis_raw.get("action_items", [])
        ]

        ai_analysis = AIAnalysis(
            clinical_summary=analysis_raw.get("clinical_summary", ""),
            key_takeaways=analysis_raw.get("key_takeaways", []),
            action_items=action_items,
            recommended_follow_up=analysis_raw.get("recommended_follow_up", "1 week"),
            icd10_codes=analysis_raw.get("icd10_codes", []),
            soap_note=analysis_raw.get("soap_note"),
        )

        return TranscribeResponse(
            success=True,
            room_id=req.room_id,
            recording_id=req.recording_id,
            transcript=transcript,
            ai_analysis=ai_analysis,
            demo_mode=not ai_service.settings.ai_mode,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
