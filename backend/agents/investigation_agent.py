from core.agent import BaseAgent
from services.investigation_service import InvestigationService


class InvestigationAgent(BaseAgent):

    def __init__(self):

        super().__init__("InvestigationAgent")

        self.service = InvestigationService()

    def process(self, packet):

        self.service.update(packet)

        return packet