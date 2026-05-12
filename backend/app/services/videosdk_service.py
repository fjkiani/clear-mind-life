"""
VideoSDK service — real API calls when keys present, rich mock when not.
"""
import uuid
import time
import httpx
from datetime import datetime, timezone
from jose import jwt

from app.config import settings


def _make_videosdk_token(room_id: str, role: str) -> str:
    """Generate a VideoSDK JWT token."""
    payload = {
        "apikey": settings.VIDEOSDK_API_KEY,
        "permissions": ["allow_join", "allow_mod"] if role == "moderator" else ["allow_join"],
        "version": 2,
        "roomId": room_id,
        "iat": int(time.time()),
        "exp": int(time.time()) + 3600,  # 1 hour
    }
    return jwt.encode(payload, settings.VIDEOSDK_SECRET_KEY, algorithm="HS256")


async def create_video_room(patient_id: str, provider_id: str, appointment_id: str | None) -> dict:
    """Create a VideoSDK room. Falls back to mock if keys absent."""
    if settings.demo_mode:
        room_id = f"demo-{uuid.uuid4().hex[:8]}"
        return {
            "success": True,
            "room_id": room_id,
            "room_name": f"Telehealth: {patient_id} ↔ {provider_id}",
            "disabled": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "demo_mode": True,
        }

    async with httpx.AsyncClient() as client:
        # Get a management token first
        mgmt_token = _make_videosdk_token("*", "moderator")
        resp = await client.post(
            f"{settings.VIDEOSDK_API_ENDPOINT}/v2/rooms",
            headers={"Authorization": mgmt_token, "Content-Type": "application/json"},
            json={"customRoomId": f"cml-{patient_id}-{provider_id}-{uuid.uuid4().hex[:6]}"},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
        return {
            "success": True,
            "room_id": data["roomId"],
            "room_name": data.get("customRoomId", data["roomId"]),
            "disabled": data.get("disabled", False),
            "created_at": data.get("createdAt", datetime.now(timezone.utc).isoformat()),
            "demo_mode": False,
        }


async def generate_token(room_id: str, participant_name: str, role: str) -> dict:
    """Generate a participant token for a VideoSDK room."""
    if settings.demo_mode:
        return {
            "success": True,
            "token": "demo_mock_token_123",
            "room_id": room_id,
            "participant_name": participant_name,
            "role": role,
            "demo_mode": True,
        }

    token = _make_videosdk_token(room_id, role)
    return {
        "success": True,
        "token": token,
        "room_id": room_id,
        "participant_name": participant_name,
        "role": role,
        "demo_mode": False,
    }


async def start_recording(room_id: str) -> dict:
    """Start recording a VideoSDK room."""
    if settings.demo_mode:
        return {
            "success": True,
            "recording_id": f"mock_rec_{uuid.uuid4().hex[:8]}",
            "room_id": room_id,
            "demo_mode": True,
        }

    async with httpx.AsyncClient() as client:
        mgmt_token = _make_videosdk_token(room_id, "moderator")
        resp = await client.post(
            f"{settings.VIDEOSDK_API_ENDPOINT}/v2/recordings/start",
            headers={"Authorization": mgmt_token, "Content-Type": "application/json"},
            json={"roomId": room_id},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
        return {
            "success": True,
            "recording_id": data.get("id", f"rec_{uuid.uuid4().hex[:8]}"),
            "room_id": room_id,
            "demo_mode": False,
        }


async def stop_recording(room_id: str, recording_id: str) -> dict:
    """Stop recording a VideoSDK room."""
    if settings.demo_mode:
        return {
            "success": True,
            "recording_id": recording_id,
            "recording_url": "https://videosdk.live/mock_recording.mp4",
            "demo_mode": True,
        }

    async with httpx.AsyncClient() as client:
        mgmt_token = _make_videosdk_token(room_id, "moderator")
        resp = await client.post(
            f"{settings.VIDEOSDK_API_ENDPOINT}/v2/recordings/stop",
            headers={"Authorization": mgmt_token, "Content-Type": "application/json"},
            json={"roomId": room_id, "id": recording_id},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
        return {
            "success": True,
            "recording_id": recording_id,
            "recording_url": data.get("fileUrl"),
            "demo_mode": False,
        }
