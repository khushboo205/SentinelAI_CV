class InvestigationSummary:

    def generate(self, detection):

        return {

            "track": detection.track_id,

            "risk": detection.risk_level,

            "events": detection.events,

            "timeline": detection.camera_history,

            "evidence": detection.evidence

        }