from core.agent import BaseAgent
from core.packet import TrackingPacket


class CrossCameraAgent(BaseAgent):

    def __init__(self):
        super().__init__("CrossCameraAgent")

        self.camera_history = {}

    def process(self, packet: TrackingPacket):

        camera = packet.frame_packet.source

        for track in packet.tracks:

            tid = track.detection.track_id

            if tid not in self.camera_history:

                self.camera_history[tid] = []

            self.camera_history[tid].append({

                "camera": camera,

                "frame": packet.frame_packet.frame_number

            })

            track.detection.camera_history = self.camera_history[tid]

        return packet