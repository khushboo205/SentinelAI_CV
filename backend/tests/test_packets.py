from core.packet import (
    FramePacket,
    DetectionPacket,
)

from core.models import Detection


frame = FramePacket(
    frame_id=1,
    width=1920,
    height=1080,
    fps=30,
    camera_id="CAM01",
    video_name="video.mp4",
)

person = Detection(
    class_id=0,
    class_name="person",
    confidence=0.96,
    bbox=[120, 150, 320, 640],
)

packet = DetectionPacket(
    frame_packet=frame,
    detections=[person],
)

print(packet)