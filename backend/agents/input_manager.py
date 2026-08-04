"""
SentinelAI Input Manager Agent

Reads frames from the VideoLoader and converts them into FramePackets.
"""

from __future__ import annotations

from core.agent import BaseAgent
from core.packet import FramePacket
from services.video_loader import VideoLoader


class InputManagerAgent(BaseAgent):

    def __init__(self, video_path: str):
        super().__init__("InputManager")

        self.loader = VideoLoader(video_path)
        self.frame_number = 0

    def process(self, packet=None):

        success, frame = self.loader.read()

        if not success:
            return None

        self.frame_number += 1

        return FramePacket(
    frame_id=self.frame_number,
    frame=frame,
    width=frame.shape[1],
    height=frame.shape[0],
    fps=self.loader.fps,
    video_name=self.loader.video_path.name
    )

    def shutdown(self):

        self.loader.release()
        super().shutdown()