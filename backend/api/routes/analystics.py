from fastapi import APIRouter
from database.repository import Repository

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

repo = Repository()


@router.get("/summary")
async def summary():

    tracks = repo.get_tracks()

    return {

        "total_tracks": len(tracks),

        "people": len(
            [t for t in tracks if t["class_name"] == "person"]
        ),

        "vehicles": len(
            [t for t in tracks if t["class_name"] != "person"]
        )
    }