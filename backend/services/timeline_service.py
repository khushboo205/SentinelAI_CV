from database.repository import Repository


class TimelineService:

    def __init__(self):

        self.repository = Repository()

    # -------------------------------------------------
    # Build Timeline for One Track
    # -------------------------------------------------

    def get_track_timeline(self, track_id):

        track = self.repository.get_track(track_id)

        if not track:
            return {
                "status": "error",
                "message": "Track not found"
            }

        events = self.repository.get_events(track_id)

        face = self.repository.get_face(track_id)

        ocr = self.repository.get_ocr(track_id)

        risk = self.repository.get_risk(track_id)

        timeline = []

        if track:
            timeline.append({
                "type": "track",
                "timestamp": track["timestamp"],
                "data": dict(track)
            })

        for event in events:
            timeline.append({
                "type": "event",
                "timestamp": event["event_time"],
                "data": dict(event)
            })

        for f in face:
            timeline.append({
                "type": "face",
                "timestamp": f["timestamp"],
                "data": dict(f)
            })

        for text in ocr:
            timeline.append({
                "type": "ocr",
                "timestamp": text["timestamp"],
                "data": dict(text)
            })

        for r in risk:
            timeline.append({
                "type": "risk",
                "timestamp": r["timestamp"],
                "data": dict(r)
            })

        timeline.sort(key=lambda x: x["timestamp"])

        return {
            "track_id": track_id,
            "timeline": timeline
        }

    # -------------------------------------------------
    # Investigation Summary
    # -------------------------------------------------

    def get_summary(self, track_id):

        track = self.repository.get_track(track_id)

        events = self.repository.get_events(track_id)

        risk = self.repository.get_risk(track_id)

        return {

            "track": track,

            "events": len(events),

            "risk": risk

        }