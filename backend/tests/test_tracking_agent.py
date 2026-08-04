from agents.input_manager import InputManagerAgent
from agents.tracker import TrackingAgent

VIDEO = "data/videos/sample2.mp4"

input_agent = InputManagerAgent(VIDEO)
tracker = TrackingAgent("yolov8n.pt")

input_agent.initialize()
tracker.initialize()

packet = input_agent.process()

while packet is not None:

    # Wrap FramePacket into DetectionPacket
    from core.packet import DetectionPacket

    detection_packet = DetectionPacket(
        frame_packet=packet
    )

    tracking_packet = tracker.process(detection_packet)

    print("=" * 50)

    for track in tracking_packet.tracks:
        print(track.track_id, track.detection.class_name)

    packet = input_agent.process()

tracker.shutdown()
input_agent.shutdown()