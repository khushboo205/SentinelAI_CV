from core.agent import BaseAgent
from core.packet import TrackingPacket


class EventReasoningAgent(BaseAgent):

    def __init__(self):
        super().__init__("EventReasoning")

    def process(self, packet: TrackingPacket):

        for track in packet.tracks:

            detection = track.detection

            events = getattr(detection, "events", [])

            reasoning = []

            priority = "LOW"

            # ----------------------------
            # Event Reasoning
            # ----------------------------

            names = [e.event_type.lower() for e in events]

        if "running" in names:

            priority = "HIGH"

            reasoning.append("Person is running")

        if "loitering" in names:

            priority = "HIGH"

            reasoning.append("Person stayed too long")

        if "face_detected" in names:

            reasoning.append("Face detected")

        if "ocr_found" in names:

            reasoning.append("OCR detected")

            detection.reasoning = reasoning

            detection.priority = priority

        return packet           