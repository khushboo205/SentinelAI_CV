"""
SentinelAI Processing Pipeline

Executes agents in sequence.
"""

from __future__ import annotations

from typing import List

from core.agent import BaseAgent
from core.packet import BasePacket


class Pipeline:
    """
    Executes packets through a sequence of agents.
    """

    def __init__(self):
        self._agents: List[BaseAgent] = []

    def add_agent(self, agent: BaseAgent) -> None:
        """
        Add an agent to the pipeline.
        """
        self._agents.append(agent)

    def initialize(self) -> None:
        """
        Initialize all agents.
        """
        for agent in self._agents:
            agent.initialize()

    def run(self, packet: BasePacket) -> BasePacket | None:
        """
        Process a packet through all agents.
        """
        current_packet = packet

        for agent in self._agents:

            if current_packet is None:
                return None

            current_packet = agent.process(current_packet)

        return current_packet

    def shutdown(self) -> None:
        """
        Shutdown all agents.
        """
        for agent in reversed(self._agents):
            agent.shutdown()