from core.agent import BaseAgent
from services.reid_service import ReIDService


class ReIDAgent(BaseAgent):

    def __init__(self):

        super().__init__("ReIDAgent")

        self.service = ReIDService()

    def process(self, packet):

        for track in packet.tracks:

            embedding = self.service.extract(track.detection)

            track.detection.reid_embedding = embedding

        return packet