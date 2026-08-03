from core.agent import BaseAgent
from core.packet import TrackingPacket


class EventDetectorAgent(BaseAgent):

    def __init__(self):
        super().__init__("EventDetector")

    def process(self, packet: TrackingPacket):

        person_count = 0
        vehicle_count = 0

        for track in packet.tracks:

            name = track.detection.class_name.lower()

            if name == "person":
                person_count += 1

            elif name in [
                "car",
                "bus",
                "truck",
                "motorcycle",
                "bicycle"
            ]:
                vehicle_count += 1

        print(f"Persons : {person_count}")
        print(f"Vehicles: {vehicle_count}")

        return packet