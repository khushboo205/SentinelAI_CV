from database.repository import Repository


class QueryEngine:

    def __init__(self):
        self.repo = Repository()

    # ----------------------------------------------------
    # TRACK SEARCH
    # ----------------------------------------------------

    def search_track(self, track_id):

        return {
            "track": self.repo.get_track(track_id),
            "events": self.repo.get_events(track_id),
            "features": self.repo.get_features(track_id),
            "faces": self.repo.get_face(track_id),
            "ocr": self.repo.get_ocr(track_id),
            "risk": self.repo.get_risk(track_id)
        }

    # ----------------------------------------------------
    # OCR SEARCH
    # ----------------------------------------------------

    def search_ocr(self, keyword):

        rows = self.repo.db.fetchall(
            """
            SELECT *
            FROM ocr
            WHERE text LIKE ?
            """,
            (f"%{keyword}%",)
        )

        return rows

    # ----------------------------------------------------
    # HIGH RISK SEARCH
    # ----------------------------------------------------

    def high_risk(self):

        return self.repo.db.fetchall(
            """
            SELECT *
            FROM risk
            WHERE suspicious=1
            ORDER BY score DESC
            """
        )

    # ----------------------------------------------------
    # CASE SEARCH
    # ----------------------------------------------------

    def search_case(self, case_id):

        return self.repo.get_case(case_id)

    # ----------------------------------------------------
    # DASHBOARD SEARCH
    # ----------------------------------------------------

    def dashboard(self):

        return {

            "tracks": self.repo.count_tracks(),

            "faces": self.repo.count_faces(),

            "events": self.repo.count_events(),

            "risk": self.repo.count_risk()

        }