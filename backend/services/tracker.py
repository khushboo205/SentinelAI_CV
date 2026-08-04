"""
SentinelAI Tracking Service

Wraps the Ultralytics tracker.
"""

from ultralytics import YOLO


class TrackingService:

    def __init__(self, model_path: str):

        self.model = YOLO(model_path)

    def track(self, frame):

        return self.model.track(
            source=frame,
            tracker="bytetrack.yaml",
            persist=True,
            conf=0.35,
            verbose=False,
        )