from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ai_classifier import CATEGORIES, classify_complaint
from database import get_db
from models import Complaint
from schemas import ComplaintCreate, ComplaintOut, ComplaintUpdate, StatsOut

router = APIRouter()


def _generate_complaint_id() -> str:
    return f"CMP-{uuid4().hex[:8].upper()}"


@router.post("/complaint", response_model=ComplaintOut, status_code=201)
def create_complaint(
    payload: ComplaintCreate,
    db: Session = Depends(get_db),
) -> Complaint:
    complaint = Complaint(
        id=_generate_complaint_id(),
        name=payload.name,
        email=payload.email,
        location=payload.location,
        description=payload.description,
        category=classify_complaint(payload.description),
        status="Pending",
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint


@router.get("/complaint/{complaint_id}", response_model=ComplaintOut)
def get_complaint(complaint_id: str, db: Session = Depends(get_db)) -> Complaint:
    complaint = db.get(Complaint, complaint_id.upper())
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint


@router.get("/complaints", response_model=list[ComplaintOut])
def list_complaints(
    category: str | None = Query(default=None),
    status: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Complaint]:
    query = db.query(Complaint).order_by(Complaint.created_at.desc())
    if category and category != "All":
        query = query.filter(Complaint.category == category)
    if status and status != "All":
        query = query.filter(Complaint.status == status)
    return query.all()


@router.put("/complaint/{complaint_id}", response_model=ComplaintOut)
def update_complaint(
    complaint_id: str,
    payload: ComplaintUpdate,
    db: Session = Depends(get_db),
) -> Complaint:
    complaint = db.get(Complaint, complaint_id.upper())
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    complaint.status = payload.status
    db.commit()
    db.refresh(complaint)
    return complaint


@router.get("/stats", response_model=StatsOut)
def get_stats(db: Session = Depends(get_db)) -> dict[str, int | dict[str, int]]:
    complaints = db.query(Complaint).all()
    categories = {category: 0 for category in CATEGORIES}
    for complaint in complaints:
        categories[complaint.category] = categories.get(complaint.category, 0) + 1

    return {
        "total": len(complaints),
        "pending": sum(1 for item in complaints if item.status == "Pending"),
        "in_progress": sum(1 for item in complaints if item.status == "In Progress"),
        "resolved": sum(1 for item in complaints if item.status == "Resolved"),
        "categories": categories,
    }
