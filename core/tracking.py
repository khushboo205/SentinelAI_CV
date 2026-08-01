from dataclasses import dataclass
from typing import List, Tuple
import numpy as np


@dataclass
class Track:
    track_id: int
    class_id: int
    class_name: str
    confidence: float
    bbox: Tuple[int, int, int, int]
    age: int
    hits: int
    confirmed: bool


@dataclass
class TrackingPacket:
    frame: np.ndarray
    frame_number: int
    timestamp: float
    tracks: List[Track]