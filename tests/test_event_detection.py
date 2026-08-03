from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent
from agents.event_detector import EventDetectorAgent

VIDEO = "data/videos/sample2.mp4"
MODEL = "yolo11n.pt"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(MODEL)
tracker = TrackingAgent(MODEL)
event = EventDetectorAgent()

input_agent.initialize()
detector.initialize()
tracker.initialize()
event.initialize()

packet = input_agent.process()

packet = detector.process(packet)
packet = tracker.process(packet)
packet = event.process(packet)

event.shutdown()
tracker.shutdown()
detector.shutdown()
input_agent.shutdown()