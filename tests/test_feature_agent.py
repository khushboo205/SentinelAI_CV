from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from agents.tracker import TrackingAgent
from agents.feature_extractor import FeatureExtractorAgent

from config.config import YOLO_MODEL

VIDEO = "video.mp4"

input_agent = InputManagerAgent(VIDEO)
detector = DetectorAgent(str(YOLO_MODEL))
tracker = TrackingAgent(str(YOLO_MODEL))
feature = FeatureExtractorAgent()

input_agent.initialize()
detector.initialize()
tracker.initialize()
feature.initialize()

packet = input_agent.process()
print("Input:", type(packet))

packet = detector.process(packet)
print("Detector:", type(packet))

packet = tracker.process(packet)
print("Tracker:", type(packet))

packet = feature.process(packet)
print("Feature:", type(packet))

print(packet.tracks[0].detection)
print(type(packet.tracks[0].detection))
print(packet.tracks[0].detection.__dict__ if hasattr(packet.tracks[0].detection, "__dict__") else "slots")
print(dir(packet.tracks[0].detection))

for track in packet.tracks:

    print(track.track_id)

    print(track.detection.attributes)

feature.shutdown()
tracker.shutdown()
detector.shutdown()
input_agent.shutdown()