from core.agent import BaseAgent
from services.feature_service import FeatureService


class FeatureExtractorAgent(BaseAgent):

    def __init__(self):

        super().__init__("FeatureExtractor")

        self.service = FeatureService()

    def process(self, packet):

        for track in packet.tracks:

            features = self.service.extract(track.detection)

            track.detection.attributes.update(features)

        return packet