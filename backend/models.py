from datetime import datetime

from sqlalchemy import Column, DateTime, String, Text

from database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(String, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(80), nullable=False, index=True)
    status = Column(String(40), nullable=False, default="Pending", index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
