from fastapi import APIRouter
from services.investigation_service import InvestigationService
from fastapi import HTTPException

router = APIRouter(
    prefix="/investigation",
    tags=["Investigation"]
)

service = InvestigationService()


# Returns all tracks
@router.get("/")
async def list_tracks():
    return service.get_tracks()


# Returns investigation details of one track
@router.get("/{track_id}")
async def get_investigation(track_id: int):

    result = service.get_investigation(track_id)

    if result["track"] is None:
        raise HTTPException(
            status_code=404,
            detail="Track not found"
        )

    return {
        "success": True,
        "data": result
    }
@router.get("/summary/stats")
async def stats():

    return {
        "tracks": len(service.get_tracks())
    }