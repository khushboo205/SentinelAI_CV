"""
SentinelAI Video Loader

Loads and streams video frames.
"""

from __future__ import annotations

from pathlib import Path

import cv2


class VideoLoader:

    def __init__(self, video_path: str):

        self.video_path = Path(video_path)

        if not self.video_path.exists():
            raise FileNotFoundError(self.video_path)

        self.capture = cv2.VideoCapture(str(self.video_path))

        if not self.capture.isOpened():
            raise RuntimeError("Unable to open video.")

    @property
    def fps(self):

        return self.capture.get(cv2.CAP_PROP_FPS)

    @property
    def width(self):

        return int(self.capture.get(cv2.CAP_PROP_FRAME_WIDTH))

    @property
    def height(self):

        return int(self.capture.get(cv2.CAP_PROP_FRAME_HEIGHT))

    @property
    def frame_count(self):

        return int(self.capture.get(cv2.CAP_PROP_FRAME_COUNT))

    def read(self):

        success, frame = self.capture.read()

        return success, frame

    def reset(self):

        self.capture.set(cv2.CAP_PROP_POS_FRAMES, 0)

    def release(self):

        self.capture.release()