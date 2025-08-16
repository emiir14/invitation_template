from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

# RSVP Models
class RSVPCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Guest name")
    attending: bool = Field(..., description="Whether guest is attending")
    comment: Optional[str] = Field(None, max_length=500, description="Additional comments")

class RSVPResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    attending: bool
    comment: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class RSVPSummary(BaseModel):
    rsvps: list[RSVPResponse]
    total: int
    attending_count: int
    not_attending_count: int