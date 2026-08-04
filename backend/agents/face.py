from core.agent import BaseAgent
from services.face_service import FaceService


class FaceAgent(BaseAgent):

    def __init__(self):

        super().__init__("FaceAgent")

        self.service = FaceService()

    def process(self, packet):

        frame = packet.frame_packet.frame

        for track in packet.tracks:

            if track.detection.class_name != "person":
                continue

            x1, y1, x2, y2 = map(int, track.detection.bbox)

            roi = frame[y1:y2, x1:x2]

            if roi.size == 0:
                continue

            faces = self.service.detect(roi)

            if len(faces) == 0:
                continue

            face = faces[0]

            track.detection.face_detected = True

            track.detection.face_embedding = face.embedding

        return packet