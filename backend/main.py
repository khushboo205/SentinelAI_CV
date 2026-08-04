import os

print("Running:", os.path.abspath(__file__))
from config.config import YOLO_MODEL

from agents.suspicion_agent import SuspicionAgent
from agents.investigation_agent import InvestigationAgent

from core.pipeline_manager import PipelineManager
from agents.event_agent import EventAgent
from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent
from agents.feature_extractor import FeatureExtractorAgent
from agents.face import FaceAgent
from agents.reid import ReIDAgent
from agents.ocr import OCRAgent
from agents.database_agent import DatabaseAgent

VIDEO = "data/videos/input/test.mp4"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(str(YOLO_MODEL))
tracker = TrackingAgent(str(YOLO_MODEL))
feature = FeatureExtractorAgent()
face = FaceAgent()
ocr = OCRAgent()
reid = ReIDAgent()
database= DatabaseAgent()
event = EventAgent()
suspicion = SuspicionAgent()

agents = [
    input_agent,
    detector,
    tracker,
    feature,
    face,
    ocr,
    reid,
    event,
    suspicion,
    database

]

pipeline = PipelineManager(agents)

pipeline.initialize()

packet = pipeline.run()


print("=" * 60)

for track in packet.tracks:

    d = track.detection

    print("=" * 60)
    print("Track :", d.track_id)
    print("Class :", d.class_name)
    print("Risk  :", d.risk_score)
    print("Alert :", d.is_suspicious)
    print("Reasons :", d.risk_reasons)
    

for agent in reversed(agents):
    agent.shutdown()