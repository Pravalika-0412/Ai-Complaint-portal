from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes.complaints import router as complaints_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Smart Complaint Portal API",
    description="FastAPI backend for AI-based civic complaint categorization and tracking.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaints_router)


@app.get("/")
def health_check():
    return {"message": "AI Smart Complaint Portal API is running"}
