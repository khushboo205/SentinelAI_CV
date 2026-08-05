from fastapi import APIRouter, UploadFile, File
import os
import shutil
from fastapi import HTTPException


from services.pipeline_service import PipelineService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


UPLOAD_DIR = "data/videos/input"

service = PipelineService()


@router.post("/")
async def upload_video(file: UploadFile = File(...)):

    # ✅ Validate uploaded file
    if not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=400,
            detail="Only video files are allowed."
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = service.process_video(path)

    return {
        "success": True,
        "filename": file.filename,
        "tracks": result
    }