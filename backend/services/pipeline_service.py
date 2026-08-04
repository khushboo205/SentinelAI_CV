from threading import Lock
from typing import Optional

from core.pipeline_manager import PipelineManager
from core.packet import TrackingPacket


class PipelineService:
    """
    Singleton service responsible for running the AI pipeline.
    """

    _instance = None
    _lock = Lock()

    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance.pipeline = PipelineManager()
        return cls._instance

    def process(self) -> Optional[TrackingPacket]:
        """
        Runs one iteration of the pipeline.
        """
        return self.pipeline.run()

    def get_status(self):
        return {
            "pipeline": "running"
        }