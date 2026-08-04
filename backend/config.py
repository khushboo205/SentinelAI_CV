LOGS_DIR = BASE_DIR / "logs"
DB_PATH = DATA_DIR / "sentinel_investigation.db"
# Ensure all workspace directories exist
for path in [INPUT_VIDEOS_DIR, OUTPUTS_DIR, REPORTS_DIR, LOGS_DIR]:
    os.makedirs(path, exist_ok=True)
# Detection & Model Hyperparameters
YOLO_MODEL_NAME = "yolo11x.pt"
DETECTION_CONFIDENCE = 0.40
REID_EMBEDDING_DIM = 512
# Anomaly Thresholds & Weights
LOITERING_TIME_SEC = 10.0
UNATTENDED_BAG_DIST_PX = 120.0
WEIGHT_BEHAVIOR = 0.40
WEIGHT_DWELL = 0.25
WEIGHT_ZONE = 0.20
WEIGHT_REID_NOVELTY = 0.15
EVIDENCE_THRESHOLD = 60.0
# Camera Definitions
CAMERAS = {
    "CAM_01": {"name": "Main Lobby Entrance", "location": "Building A - Floor 1"},
    "CAM_02": {"name": "Server Vault Corridor", "location": "Building B - Basement"},
    "CAM_03": {"name": "Perimeter Loading Gate", "location": "West Zone"},
    "CAM_04": {"name": "Executive Corridor", "location": "Building A - Floor 4"}
}
