from core.agent import BaseAgent
from core.packet import TrackingPacket


class InvestigationGraphAgent(BaseAgent):

    def __init__(self):
        super().__init__("InvestigationGraphAgent")

        self.graph = {}

    def process(self, packet: TrackingPacket):

        for track in packet.tracks:

            detection = track.detection

            track_id = detection.track_id

            if track_id not in self.graph:

                self.graph[track_id] = {

                    "track_id": track_id,

                    "class": detection.class_name,

                    "events": [],

                    "faces": [],

                    "ocr": [],

                    "vehicles": [],

                    "objects": [],

                    "evidence": []

                }

            node = self.graph[track_id]

            # Events
            for event in getattr(detection, "events", []):

                node["events"].append(event)

            # OCR
            if hasattr(detection, "ocr_text"):

                node["ocr"].append(detection.ocr_text)

            # Face
            if getattr(detection, "face_detected", False):

                node["faces"].append(True)

            # Evidence
            for ev in getattr(detection, "evidence", []):

                node["evidence"].append(ev)

            detection.graph = node

        return packet