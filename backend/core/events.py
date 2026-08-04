from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Any


@dataclass(slots=True)
class Event:

    event_type: str

    track_id: int

    timestamp: datetime

    description: str

    confidence: float = 1.0

    metadata: Dict[str, Any] = field(default_factory=dict)