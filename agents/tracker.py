from ultralytics import YOLO

from core.agent import BaseAgent
from core.packet import DetectionPacket, TrackingPacket
from core.models import Detection, Track
from services.tracker import TrackingService


class TrackingAgent(BaseAgent):

    def __init__(self, model_path: str):
        super().__init__("TrackerAgent")

        self.tracker = TrackingService(model_path)

    def process(self, packet: DetectionPacket):

        frame = packet.frame_packet.frame

        results = self.tracker.track(frame)

        result = results[0]

        tracks = []

        if result.boxes.id is None:
            return TrackingPacket(
                frame_packet=packet.frame_packet,
                tracks=[]
            )

        ids = result.boxes.id.cpu().numpy().astype(int)
        boxes = result.boxes.xyxy.cpu().numpy()
        confs = result.boxes.conf.cpu().numpy()
        classes = result.boxes.cls.cpu().numpy().astype(int)

        for track_id, box, conf, cls in zip(ids, boxes, confs, classes):

            detection = Detection(
                bbox=tuple(box),
                confidence=float(conf),
                class_id=int(cls),
                class_name=self.tracker.model.names[int(cls)],
                track_id=int(track_id)
            )

            tracks.append(
                Track(
                    track_id=int(track_id),
                    detection=detection
                )
            )

        return TrackingPacket(
            frame_packet=packet.frame_packet,
            tracks=tracks
        )