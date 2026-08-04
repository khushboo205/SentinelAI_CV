from core.agent import BaseAgent
from core.packet import TrackingPacket
from services.enhancer import Enhancer


class EnhancementAgent(BaseAgent):

    def __init__(self):
        super().__init__("Enhancement")

        self.enhancer = Enhancer()

    def process(self, packet: TrackingPacket):

        frame = packet.frame_packet.frame

        for track in packet.tracks:

            if not track.detection.is_blurry:
                continue

            x1, y1, x2, y2 = map(int, track.detection.bbox)

            roi = frame[y1:y2, x1:x2]

            if roi.size == 0:
                continue

            enhanced = self.enhancer.enhance(roi)

            frame[y1:y2, x1:x2] = enhanced

        return packet