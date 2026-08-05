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
    def get_tracks(self):

        return self.db.fetchall(
            """
            SELECT *
            FROM tracks
            ORDER BY track_id
            """
        )
    def save_investigation(
        self,
        track_id,
        class_name,
        risk_score,
        summary
    ):

        self.db.execute(
            """
            INSERT INTO investigation(
                track_id,
                class_name,
                risk_score,
                summary,
                timestamp
            )
            VALUES(?,?,?,?,?)
            """,
            (
                track_id,
                class_name,
                risk_score,
                summary,
                datetime.now().isoformat()
            )
        )
    def save_timeline(
        self,
        track_id,
        event
    ):

        self.db.execute(
            """
            INSERT INTO timeline(
                track_id,
                event,
                timestamp
            )
            VALUES(?,?,?)
            """,
            (
                track_id,
                event,
                datetime.now().isoformat()
            )
        )
    def count_tracks(self):

        row = self.db.fetchone(
            "SELECT COUNT(*) AS total FROM tracks"
        )

        return row["total"]

    def count_faces(self):

        row = self.db.fetchone(
            """
            SELECT COUNT(*)
            AS total
            FROM faces
            WHERE detected=1
            """
        )

        return row["total"]

    def count_events(self):

        row = self.db.fetchone(
            "SELECT COUNT(*) AS total FROM events"
        )

        return row["total"]

    def count_risk(self):

        row = self.db.fetchone(
            """
            SELECT COUNT(*)
            AS total
            FROM risk
            WHERE suspicious=1
            """
        )

        return row["total"]

# =====================================================
# CASES
# =====================================================

    def create_case(
        self,
        title,
        description,
        priority="MEDIUM",
        assigned_officer=None
    ):

        self.db.execute(
            """
            INSERT INTO cases(
                title,
                description,
                priority,
                assigned_officer
            )
            VALUES(?,?,?,?)
            """,
            (
                title,
                description,
                priority,
                assigned_officer
            )
        )


    def get_case(self, case_id):

        return self.db.fetchone(
            """
            SELECT *
            FROM cases
            WHERE case_id=?
            """,
            (case_id,)
        )


    def list_cases(self):

        return self.db.fetchall(
            """
            SELECT *
            FROM cases
            ORDER BY created_at DESC
            """
        )


    def close_case(self, case_id):

        self.db.execute(
            """
            UPDATE cases
            SET status='CLOSED'
            WHERE case_id=?
            """,
            (case_id,)
        )


    def assign_case(
        self,
        case_id,
        officer
    ):

        self.db.execute(
            """
            UPDATE cases
            SET assigned_officer=?
            WHERE case_id=?
            """,
            (
                officer,
                case_id
            )
        )

# =====================================================
# EVIDENCE
# =====================================================

    def save_evidence(

        self,

        case_id,

        track_id,

        frame_number,

        timestamp,

        original_image,

        enhanced_image,

        quality_score,

        risk_score

    ):

        self.db.execute(

            """
            INSERT INTO evidence(

                case_id,

                track_id,

                frame_number,

                timestamp,

                original_image,

                enhanced_image,

                quality_score,

                risk_score

            )

            VALUES(?,?,?,?,?,?,?,?)

            """,

            (

                case_id,

                track_id,

                frame_number,

                timestamp,

                original_image,

                enhanced_image,

                quality_score,

                risk_score

            )

        )


    def get_evidence(

        self,

        case_id

    ):

        return self.db.fetchall(

            """
            SELECT *

            FROM evidence

            WHERE case_id=?

            ORDER BY quality_score DESC

            """,

            (case_id,)

        )
    def get_best_evidence(self, case_id):

        return self.db.fetchall(

            """
            SELECT *

            FROM evidence

            WHERE case_id=?

            ORDER BY risk_score DESC,

                    quality_score DESC

            """,

            (case_id,)

        )

    # =====================================================
    # NOTES
    # =====================================================

    def add_note(

        self,

        case_id,

        author,

        note

    ):

        self.db.execute(

            """
            INSERT INTO notes(

                case_id,

                author,

                note

            )

            VALUES(?,?,?)

            """,

            (

                case_id,

                author,

                note

            )

        )


    def get_notes(

        self,

        case_id

    ):

        return self.db.fetchall(

            """
            SELECT *

            FROM notes

            WHERE case_id=?

            ORDER BY created_at DESC

            """,

            (case_id,)

        )

    # =====================================================
    # RECOMMENDATIONS
    # =====================================================

    def save_recommendation(

        self,

        case_id,

        recommendation,

        confidence

    ):

        self.db.execute(

            """
            INSERT INTO recommendations(

                case_id,

                recommendation,

                confidence

            )

            VALUES(?,?,?)

            """,

            (

                case_id,

                recommendation,

                confidence

            )

        )


    def get_recommendations(

        self,

        case_id

    ):

        return self.db.fetchall(

            """
            SELECT *

            FROM recommendations

            WHERE case_id=?

            ORDER BY confidence DESC

            """,

            (case_id,)

        )

    # =====================================================
    # RELATIONSHIPS
    # =====================================================

    def save_relationship(

        self,

        source_type,

        source_id,

        target_type,

        target_id,

        relation

    ):

        self.db.execute(

            """
            INSERT INTO relationships(

                source_type,

                source_id,

                target_type,

                target_id,

                relation

            )

            VALUES(?,?,?,?,?)

            """,

            (

                source_type,

                source_id,

                target_type,

                target_id,

                relation

            )

        )


    def get_relationships(

        self,

        source_id

    ):

        return self.db.fetchall(

            """
            SELECT *

            FROM relationships

            WHERE source_id=?

            """,

            (source_id,)

        )

    def save_reasoning(

        self,

        track_id,

        priority,

        reasoning

    ):

        self.db.execute(

            """
            INSERT INTO reasoning(

                track_id,

                priority,

                reasoning

            )

            VALUES(?,?,?)

            """,

            (

                track_id,

                priority,

                reasoning

            )

        )
        self.db.execute("""
            CREATE TABLE IF NOT EXISTS reasoning(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            priority TEXT,

            reasoning TEXT

        )
        """)
         