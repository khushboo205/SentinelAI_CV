from database.database import Database


class Schema:

    def __init__(self):

        self.db = Database()

    def create_tables(self):

        self.db.execute("""

        CREATE TABLE IF NOT EXISTS tracks(

            track_id INTEGER PRIMARY KEY,

            class_name TEXT,

            confidence REAL,

            timestamp TEXT

        )

        """)

        self.db.execute("""

        CREATE TABLE IF NOT EXISTS events(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            event TEXT,

            event_time TEXT

        )

        """)

        self.db.execute("""

        CREATE TABLE IF NOT EXISTS ocr(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            text TEXT

        )

        """)

        self.db.execute("""

        CREATE TABLE IF NOT EXISTS faces(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            identity TEXT,

            confidence REAL

        )

        """)

        print("Database schema created.")