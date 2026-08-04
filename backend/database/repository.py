from datetime import datetime

from database.database import Database
from datetime import datetime


class Repository:

    def __init__(self):

        self.db = Database()



    def save_track(self, track):

        self.db.execute(
            """
            INSERT OR REPLACE INTO tracks
            VALUES(?,?,?,?,?,?,?,?)
            """,
            (
                track.track_id,
                track.detection.class_name,
                track.detection.confidence,
                datetime.now().isoformat(),
                track.detection.quality_score,
                int(track.detection.is_blurry),
                int(track.detection.face_detected),
                ",".join(track.detection.ocr_text)
            )
        )
    def save_event(self, track_id, event):

        self.db.execute(

            """

            INSERT INTO events(

                track_id,

                event,

                event_time

            )

            VALUES(?,?,?)

            """,

            (

                track_id,

                event,

                datetime.now().isoformat()

            )

        )

    def save_features(self, track):

        for key, value in track.detection.attributes.items():

            self.db.execute(
                """
                INSERT INTO features(
                    track_id,
                    feature_name,
                    feature_value
                )
                VALUES(?,?,?)
                """,
                (
                    track.track_id,
                    key,
                    str(value)
                )
            )
    def save_face(self, track):

        d = track.detection

        self.db.execute(
            """
            INSERT INTO faces(
                track_id,
                detected,
                identity,
                confidence
            )
            VALUES(?,?,?,?)
            """,
            (
                d.track_id,
                int(d.face_detected),
                d.face_identity,
                d.face_confidence
            )
        )

    def save_ocr(self, track):

        d = track.detection

        if not d.ocr_text:
            return

        for text in d.ocr_text:

            self.db.execute(
                """
                INSERT INTO ocr(
                    track_id,
                    text
                )
                VALUES(?,?)
                """,
                (
                    d.track_id,
                    text
                )
            )

    def save_risk(self, track):

        d = track.detection

        self.db.execute(
            """
            INSERT INTO risk(
                track_id,
                score,
                suspicious
            )
            VALUES(?,?,?)
            """,
            (
                d.track_id,
                d.risk_score,
                int(d.is_suspicious)
            )
        )
    def get_track(self, track_id):

        return self.db.fetchone(

            """
            SELECT *

            FROM tracks

            WHERE track_id=?
            """,

            (track_id,)
        )
    def get_events(self, track_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM events

            WHERE track_id=?

            ORDER BY event_time
            """,

            (track_id,)
        )

    def get_features(self, track_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM features

            WHERE track_id=?
            """,

            (track_id,)
        )
    def get_face(self, track_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM faces

            WHERE track_id=?
            """,

            (track_id,)
        )
    def get_ocr(self, track_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM ocr

            WHERE track_id=?
            """,

            (track_id,)
        )
    def get_risk(self, track_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM risk

            WHERE track_id=?
            """,

            (track_id,)
        )