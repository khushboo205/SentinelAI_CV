from database.repository import Repository


class DashboardService:

    def __init__(self):
        self.repo = Repository()

    def summary(self):

        return {

            "cases": self.repo.count_cases(),

            "tracks": self.repo.count_tracks(),

            "events": self.repo.count_events(),

            "faces": self.repo.count_faces(),

            "vehicles": self.repo.count_vehicles(),

            "alerts": self.repo.count_alerts(),

            "critical": self.repo.count_critical(),

            "evidence": self.repo.count_evidence()

        }