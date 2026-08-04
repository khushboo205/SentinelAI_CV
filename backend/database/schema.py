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

            timestamp TEXT,

            quality_score REAL,

            is_blurry INTEGER,

            face_detected INTEGER,

            ocr_text TEXT
        )
        """)

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS features(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            feature_name TEXT,

            feature_value TEXT
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

        print("Database schema created.")

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS faces(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            detected INTEGER,

            identity TEXT,

            confidence REAL,

            timestamp TEXT
        )
        """)

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS ocr(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            text TEXT,

            timestamp TEXT
        )
        """)

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS risk(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            score REAL,

            suspicious INTEGER,

            timestamp TEXT
        )
        """)

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS investigation(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            class_name TEXT,

            risk_score REAL,

            summary TEXT,

            timestamp TEXT
        )
        """)

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS timeline(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            event TEXT,

            timestamp TEXT
        )
        """)