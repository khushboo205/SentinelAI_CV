from datetime import datetime

from database.database import Database


class Repository:

    def __init__(self):

        self.db = Database()

    def save_track(self, track):

        self.db.execute(

            """

            INSERT OR REPLACE INTO tracks

            VALUES(?,?,?,?)

            """,

            (

                track.track_id,

                track.detection.class_name,

                track.detection.confidence,

                datetime.now().isoformat()

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