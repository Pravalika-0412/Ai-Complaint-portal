import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import Base, engine
from routes.complaints import router as complaints_router

Base.metadata.create_all(bind=engine)


def get_allowed_origins() -> list[str]:
    local_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    deployed_origins = os.getenv("ALLOWED_ORIGINS", "")
    return local_origins + [
        origin.strip().rstrip("/")
        for origin in deployed_origins.split(",")
        if origin.strip()
    ]


def get_allowed_origin_regex() -> str | None:
    if os.getenv("ALLOW_RAILWAY_ORIGINS", "true").lower() == "true":
        return r"https://.*\.up\.railway\.app"
    return os.getenv("ALLOWED_ORIGIN_REGEX")


app = FastAPI(
    title="AI Smart Complaint Portal API",
    description="FastAPI backend for AI-based civic complaint categorization and tracking.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_origin_regex=get_allowed_origin_regex(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaints_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"message": "AI Smart Complaint Portal API is running"}


static_dir = os.getenv(
    "STATIC_DIR",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist"),
)

if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="frontend")
