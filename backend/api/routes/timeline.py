from fastapi import APIRouter

from services.timeline_service import TimelineService

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"]
)

service = TimelineService()


@router.get("/{track_id}")
async def timeline(track_id: int):

    return service.get_track_timeline(track_id)


@router.get("/summary/{track_id}")
async def summary(track_id: int):

    return service.get_summary(track_id)