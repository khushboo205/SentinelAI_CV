from __future__ import annotations

from dataclasses import dataclass,field
from typing import List, Optional, Any

# ==========================================================
# Detection
# ==========================================================
@dataclass(slots=True)
class Detection:
    """
    Single object detected by YOLO.
    """

    # Detection
    bbox: tuple[float, float, float, float]
    confidence: float
    class_id: int
    class_name: str

    track_id: Optional[int] = None

    # Image
    crop: Optional[Any] = None

    # Quality
    quality_score: float = 0.0
    is_blurry: bool = False

    # OCR
    ocr_text: list[str] = field(default_factory=list)

    # Face
    face_detected: bool = False
    face_identity: Optional[str] = None
    face_confidence: float = 0.0
    face_embedding: Optional[Any] = None

    reid_embedding: object | None = None

    # Attributes
    attributes: dict = field(default_factory=dict)

    # Events
    events: list[str] = field(default_factory=list)

    risk_score: float = 0.0

    is_suspicious: bool = False

    risk_reasons: list[str] = field(default_factory=list)
# ==========================================================
# Track
# ==========================================================

@dataclass(slots=True)
class Track:
    """
    Represents one tracked object.
    """

    track_id: int

    detection: Detection

    first_seen: int = 0

    last_seen: int = 0

    age: int = 0

    active: bool = True


# ==========================================================
# ReID Result
# ==========================================================

@dataclass(slots=True)
class ReIDResult:
    """
    Identity information produced by the ReID agent.
    """
    track_id: int

    embedding: Optional[Any] = None

    identity: Optional[str] = None

    similarity: float = 0.0


# ==========================================================
# Feature
# ==========================================================

@dataclass(slots=True)
class Feature:
    """
    Semantic information extracted from an object.
    """

    track_id: int

    shirt_color: str = ""

    pant_color: str = ""

    bag: bool = False

    helmet: bool = False

    face_visible: bool = False

    clip_embedding: Optional[Any] = None