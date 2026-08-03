from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent

from config.config import YOLO_MODEL

VIDEO = "video.mp4"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(str(YOLO_MODEL))
tracker = TrackingAgent(str(YOLO_MODEL))

input_agent.initialize()
detector.initialize()
tracker.initialize()

packet = input_agent.process()
packet = detector.process(packet)
packet = tracker.process(packet)

print("Tracks stored successfully.")

tracker.shutdown()
detector.shutdown()
input_agent.shutdown()