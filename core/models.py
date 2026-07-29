"""
SentinelAI Core Models

Shared data models used throughout SentinelAI.

Author: SentinelAI
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional, Any


# ==========================================================
# Detection
# ==========================================================

from dataclasses import dataclass
from typing import Optional, Any


@dataclass(slots=True)
class Detection:
    """
    Single object detected by YOLO.
    """

    bbox: tuple[float, float, float, float]

    confidence: float

    class_id: int

    class_name: str

    track_id: Optional[int] = None

    crop: Optional[Any] = None

    quality_score: float = 0.0
    
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

    age: int = 0


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