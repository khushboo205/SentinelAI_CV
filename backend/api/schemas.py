from pydantic import BaseModel


class StatusResponse(BaseModel):
    pipeline: str


class TrackResponse(BaseModel):
    track_id: int
    class_name: str
    confidence: float
    quality: float
    ocr: list[str]
    face: bool
    features: dict