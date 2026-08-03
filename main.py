from config.config import YOLO_MODEL

from core.pipeline_manager import PipelineManager

from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent
from agents.feature_extractor import FeatureExtractorAgent
from agents.face import FaceAgent
from agents.reid import ReIDAgent
from agents.ocr import OCRAgent

VIDEO = "data/videos/input/test.mp4"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(str(YOLO_MODEL))
tracker = TrackingAgent(str(YOLO_MODEL))
feature = FeatureExtractorAgent()
face = FaceAgent()
ocr = OCRAgent()
reid = ReIDAgent()

agents = [
    input_agent,
    detector,
    tracker,
    feature,
    face,
    ocr,
    reid
]

pipeline = PipelineManager(agents)

pipeline.initialize()

packet = pipeline.run()

print("=" * 60)

for track in packet.tracks:

    print(f"Track ID : {track.track_id}")
    print(f"Class    : {track.detection.class_name}")
    print(f"Quality  : {track.detection.quality_score}")
    print(f"OCR      : {track.detection.ocr_text}")
    print(f"Face     : {track.detection.face_detected}")
    print(f"Features : {track.detection.attributes}")

    print("-" * 60)

for agent in reversed(agents):
    agent.shutdown()