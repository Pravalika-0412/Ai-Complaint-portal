from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

ComplaintStatus = Literal["Pending", "In Progress", "Resolved"]


class ComplaintCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    location: str = Field(..., min_length=2, max_length=255)
    description: str = Field(..., min_length=8)


class ComplaintUpdate(BaseModel):
    status: ComplaintStatus


class ComplaintOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    location: str
    description: str
    category: str
    status: ComplaintStatus
    created_at: datetime

    class Config:
        from_attributes = True


class StatsOut(BaseModel):
    total: int
    pending: int
    in_progress: int
    resolved: int
    categories: dict[str, int]
