from core.agent import BaseAgent
from core.packet import TrackingPacket
from services.ocr_service import OCRService


class OCRAgent(BaseAgent):

    def __init__(self):

        super().__init__("OCR")

        self.ocr = OCRService()

    def process(self, packet: TrackingPacket):

        frame = packet.frame_packet.frame

        for track in packet.tracks:

            x1, y1, x2, y2 = map(int, track.detection.bbox)

            roi = frame[y1:y2, x1:x2]

            if roi.size == 0:
                continue

            texts = self.ocr.read(roi)

            track.detection.ocr_text = texts

        return packet