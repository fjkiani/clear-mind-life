"""
Clear Mind Life — FastAPI Backend
Port: 8001
All endpoints have demo/mock fallbacks when API keys are absent.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.routers import video, rcm, governance

app = FastAPI(
    title="Clear Mind Life API",
    description="Healthcare RCM + Telehealth backend for Clear Mind Life SaaS",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list + ["*"],  # permissive for demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(video.router)
app.include_router(rcm.router)
app.include_router(governance.router)


# ── Health / Status ───────────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "clear-mind-life-api",
        "version": "1.0.0",
        "demo_mode": settings.demo_mode,
        "ai_mode": settings.ai_mode,
        "transcription_mode": settings.transcription_mode,
        "env": settings.APP_ENV,
    }


@app.get("/")
async def root():
    return JSONResponse({
        "service": "Clear Mind Life API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "demo_mode": settings.demo_mode,
    })
