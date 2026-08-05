from database.repository import Repository


class GraphBuilder:

    def __init__(self):

        self.repo = Repository()

    def build_track_graph(self, track_id):

        graph = {

            "track": self.repo.get_track(track_id),

            "faces": self.repo.get_face(track_id),

            "events": self.repo.get_events(track_id),

            "ocr": self.repo.get_ocr(track_id),

            "risk": self.repo.get_risk(track_id),

            "features": self.repo.get_features(track_id)

        }

        return graph

    def build_case_graph(self, case_id):

        return {

            "case": self.repo.get_case(case_id),

            "evidence": self.repo.get_evidence(case_id),

            "notes": self.repo.get_notes(case_id),

            "recommendations": self.repo.get_recommendations(case_id)

        }