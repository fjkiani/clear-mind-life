"""
Central configuration — reads from environment variables.
All keys are optional; missing keys activate demo/mock mode.
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # ── VideoSDK ──────────────────────────────────────────────────────
    VIDEOSDK_API_KEY: Optional[str] = None
    VIDEOSDK_SECRET_KEY: Optional[str] = None
    VIDEOSDK_API_ENDPOINT: str = "https://api.videosdk.live"

    # ── AssemblyAI ────────────────────────────────────────────────────
    ASSEMBLYAI_API_KEY: Optional[str] = None

    # ── OpenAI ────────────────────────────────────────────────────────
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o-mini"

    # ── App ───────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,https://clear-mind-life.vercel.app"

    class Config:
        env_file = ".env"
        extra = "ignore"

    @property
    def demo_mode(self) -> bool:
        """True when any critical key is missing — activates mock responses."""
        return not (self.VIDEOSDK_API_KEY and self.VIDEOSDK_SECRET_KEY)

    @property
    def ai_mode(self) -> bool:
        """True when OpenAI key is present."""
        return bool(self.OPENAI_API_KEY)

    @property
    def transcription_mode(self) -> bool:
        """True when AssemblyAI key is present."""
        return bool(self.ASSEMBLYAI_API_KEY)

    @property
    def cors_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]


settings = Settings()
