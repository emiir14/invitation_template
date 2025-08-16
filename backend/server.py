from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import RSVPCreate, RSVPResponse, RSVPSummary
from datetime import datetime
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Utility functions
def sanitize_input(text: str) -> str:
    """Sanitize input text by stripping and removing HTML tags"""
    if not text:
        return text
    # Strip whitespace
    text = text.strip()
    # Remove HTML tags (basic sanitization)
    text = re.sub(r'<[^>]+>', '', text)
    return text

def validate_name(name: str) -> str:
    """Validate and sanitize name input"""
    name = sanitize_input(name)
    if not name or len(name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Name must be at least 2 characters long")
    if len(name) > 100:
        raise HTTPException(status_code=400, detail="Name must be less than 100 characters")
    return name

async def check_duplicate_rsvp(name: str) -> bool:
    """Check if RSVP already exists for this name"""
    existing = await db.rsvp_responses.find_one({"name": {"$regex": f"^{re.escape(name)}$", "$options": "i"}})
    return existing is not None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Wedding Invitation API - Hello World"}

@api_router.post("/rsvp", response_model=dict)
async def create_rsvp(rsvp_data: RSVPCreate, request: Request):
    """Submit RSVP response"""
    try:
        # Validate and sanitize inputs
        name = validate_name(rsvp_data.name)
        comment = sanitize_input(rsvp_data.comment) if rsvp_data.comment else None
        
        # Check for duplicate RSVP
        if await check_duplicate_rsvp(name):
            # Update existing RSVP instead of creating duplicate
            await db.rsvp_responses.update_one(
                {"name": {"$regex": f"^{re.escape(name)}$", "$options": "i"}},
                {
                    "$set": {
                        "attending": rsvp_data.attending,
                        "comment": comment,
                        "timestamp": datetime.utcnow(),
                        "ip_address": request.client.host,
                        "user_agent": request.headers.get("user-agent", "")
                    }
                }
            )
            return {
                "message": "RSVP updated successfully",
                "name": name,
                "attending": rsvp_data.attending,
                "comment": comment
            }
        
        # Create new RSVP
        rsvp_obj = RSVPResponse(
            name=name,
            attending=rsvp_data.attending,
            comment=comment,
            ip_address=request.client.host,
            user_agent=request.headers.get("user-agent", "")
        )
        
        # Insert into database
        result = await db.rsvp_responses.insert_one(rsvp_obj.dict())
        
        if result.inserted_id:
            return {
                "message": "RSVP submitted successfully",
                "id": rsvp_obj.id,
                "name": name,
                "attending": rsvp_data.attending,
                "comment": comment,
                "timestamp": rsvp_obj.timestamp.isoformat()
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save RSVP")
            
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error creating RSVP: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/rsvp", response_model=RSVPSummary)
async def get_rsvps():
    """Get all RSVP responses with summary statistics"""
    try:
        # Fetch all RSVPs sorted by timestamp (newest first)
        rsvps_cursor = db.rsvp_responses.find().sort("timestamp", -1)
        rsvps_list = await rsvps_cursor.to_list(None)
        
        # Convert to response models
        rsvps = [RSVPResponse(**rsvp) for rsvp in rsvps_list]
        
        # Calculate statistics
        total = len(rsvps)
        attending_count = sum(1 for rsvp in rsvps if rsvp.attending)
        not_attending_count = total - attending_count
        
        return RSVPSummary(
            rsvps=rsvps,
            total=total,
            attending_count=attending_count,
            not_attending_count=not_attending_count
        )
        
    except Exception as e:
        logging.error(f"Error fetching RSVPs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch RSVPs")

@api_router.get("/rsvp/stats")
async def get_rsvp_stats():
    """Get RSVP statistics only"""
    try:
        total = await db.rsvp_responses.count_documents({})
        attending = await db.rsvp_responses.count_documents({"attending": True})
        not_attending = await db.rsvp_responses.count_documents({"attending": False})
        
        return {
            "total": total,
            "attending": attending,
            "not_attending": not_attending,
            "response_rate": f"{(total / 100 * 100):.1f}%" if total > 0 else "0%"
        }
        
    except Exception as e:
        logging.error(f"Error fetching RSVP stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "status_code": 500}
    )

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()