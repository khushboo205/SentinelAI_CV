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

# =====================================================
# CASES
# =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS cases(

            case_id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT NOT NULL,

            description TEXT,

            status TEXT DEFAULT 'OPEN',

            priority TEXT DEFAULT 'MEDIUM',

            assigned_officer TEXT,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,

            updated_at TEXT DEFAULT CURRENT_TIMESTAMP

        )
        """)

        # =====================================================
        # EVIDENCE
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS evidence(

            evidence_id INTEGER PRIMARY KEY AUTOINCREMENT,

            case_id INTEGER,

            track_id INTEGER,

            frame_number INTEGER,

            timestamp TEXT,

            original_image TEXT,

            enhanced_image TEXT,

            quality_score REAL,

            risk_score REAL,

            FOREIGN KEY(case_id) REFERENCES cases(case_id)

        )
        """)

        # =====================================================
        # NOTES
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS notes(

            note_id INTEGER PRIMARY KEY AUTOINCREMENT,

            case_id INTEGER,

            author TEXT,

            note TEXT,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(case_id) REFERENCES cases(case_id)

        )
        """)

        # =====================================================
        # RECOMMENDATIONS
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS recommendations(

            recommendation_id INTEGER PRIMARY KEY AUTOINCREMENT,

            case_id INTEGER,

            recommendation TEXT,

            confidence REAL,

            created_at TEXT DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(case_id) REFERENCES cases(case_id)

        )
        """)

        # =====================================================
        # RELATIONSHIPS
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS relationships(

            relation_id INTEGER PRIMARY KEY AUTOINCREMENT,

            source_type TEXT,

            source_id TEXT,

            target_type TEXT,

            target_id TEXT,

            relation TEXT

        )
        """)

        # =====================================================
        # CAMERA HISTORY
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS camera_history(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            camera TEXT,

            frame INTEGER,

            timestamp TEXT

        )
        """)

        # =====================================================
        # KNOWLEDGE GRAPH
        # =====================================================

        self.db.execute("""
        CREATE TABLE IF NOT EXISTS graph(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            track_id INTEGER,

            graph_json TEXT

        )
        """)

        print("All SentinelAI tables created successfully.")