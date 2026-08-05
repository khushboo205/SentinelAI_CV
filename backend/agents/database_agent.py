from core.agent import BaseAgent
from database.repository import Repository


class DatabaseAgent(BaseAgent):

    def __init__(self):

        super().__init__("DatabaseAgent")

        self.repository = Repository()

    def process(self, packet):

        for track in packet.tracks:

            self.repository.save_track(track)
            self.repository.save_features(track)

            if track.detection.face_detected:
                self.repository.save_face(track)

            if track.detection.ocr_text:
                self.repository.save_ocr(track)

            self.repository.save_risk(track)

            for event in track.detection.events:
                self.repository.save_event(
                    track.track_id,
                    event.event_type
                )

        return packet

