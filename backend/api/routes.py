from fastapi import APIRouter
from services.pipeline_service import PipelineService

router = APIRouter()
pipeline = PipelineService()


@router.get("/status")
def status():
    return pipeline.get_status()


@router.get("/tracks")
def get_tracks():

    packet = pipeline.process()

    if packet is None:
        return []

    result = []

    for track in packet.tracks:

        d = track.detection

        result.append(
            {
                "track_id": d.track_id,
                "class_name": d.class_name,
                "confidence": float(d.confidence),
                "quality": float(d.quality_score),
                "ocr": d.ocr_text,
                "face": d.face_detected,
                "features": d.attributes,
            }
        )

    return result