from database.repository import Repository


class InvestigationService:

    def __init__(self):

        self.repository = Repository()

    def get_investigation(self, track_id):

        return {

            "track": self.repository.get_track(track_id),

            "events": self.repository.get_events(track_id),

            "features": self.repository.get_features(track_id),

            "faces": self.repository.get_face(track_id),

            "ocr": self.repository.get_ocr(track_id),

            "risk": self.repository.get_risk(track_id)

        }