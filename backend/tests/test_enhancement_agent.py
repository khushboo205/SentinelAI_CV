from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent
from agents.quality_assessor import QualityAssessmentAgent
from agents.enhancement import EnhancementAgent

VIDEO = "data/videos/sample2.mp4"
MODEL = "yolo11n.pt"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(MODEL)
tracker = TrackingAgent(MODEL)
quality = QualityAssessmentAgent()
enhancement = EnhancementAgent()

input_agent.initialize()
detector.initialize()
tracker.initialize()
quality.initialize()
enhancement.initialize()

packet = input_agent.process()

packet = detector.process(packet)
packet = tracker.process(packet)
packet = quality.process(packet)
packet = enhancement.process(packet)

print("Enhancement Agent executed successfully.")

enhancement.shutdown()
quality.shutdown()
tracker.shutdown()
detector.shutdown()
input_agent.shutdown()