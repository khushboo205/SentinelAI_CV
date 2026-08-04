from core.agent import BaseAgent
from core.packet import TrackingPacket
from services.quality_assessor import QualityAssessor


class QualityAssessmentAgent(BaseAgent):

    def __init__(self):
        super().__init__("QualityAssessment")

        self.assessor = QualityAssessor()

    def process(self, packet: TrackingPacket):

        for track in packet.tracks:

            x1, y1, x2, y2 = map(int, track.detection.bbox)

            roi = packet.frame_packet.frame[y1:y2, x1:x2]

            if roi.size == 0:
                continue

            blurry, score = self.assessor.is_blurry(roi)

            track.detection.quality_score = score
            track.detection.is_blurry = blurry
        return packet