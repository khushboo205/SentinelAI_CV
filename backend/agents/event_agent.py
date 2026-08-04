from datetime import datetime

from core.agent import BaseAgent
from core.events import Event


class EventAgent(BaseAgent):

    def __init__(self):

        super().__init__("EventAgent")

        self.previous_tracks = set()

    def process(self, packet):

        current_tracks = set()

        for track in packet.tracks:

            detection = track.detection

            current_tracks.add(detection.track_id)

            # New Object
            if detection.track_id not in self.previous_tracks:

                detection.events.append(

                    Event(
                        event_type="OBJECT_ENTERED",
                        track_id=detection.track_id,
                        timestamp=datetime.now(),
                        description=f"{detection.class_name} entered scene",
                    )

                )

            # Face Event
            if detection.face_detected:

                detection.events.append(

                    Event(
                        event_type="FACE_DETECTED",
                        track_id=detection.track_id,
                        timestamp=datetime.now(),
                        description="Face detected",
                    )

                )

            # OCR Event
            if detection.ocr_text:

                detection.events.append(

                    Event(
                        event_type="OCR_FOUND",
                        track_id=detection.track_id,
                        timestamp=datetime.now(),
                        description="OCR text detected",
                        metadata={
                            "text": detection.ocr_text
                        }
                    )

                )

        self.previous_tracks = current_tracks

        return packet