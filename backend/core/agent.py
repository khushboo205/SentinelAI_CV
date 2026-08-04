"""
SentinelAI Base Agent

Every SentinelAI module inherits from this class.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Optional

from core.constants import AgentStatus
from core.logger import LoggerFactory
from core.packet import BasePacket


class BaseAgent(ABC):
    """
    Abstract base class for all SentinelAI agents.
    """

    def __init__(self, name: str):

        self.name = name
        self.status = AgentStatus.CREATED
        self.logger = LoggerFactory.get_logger(name)

    def initialize(self) -> None:
        """
        Initialize the agent.
        """

        self.status = AgentStatus.INITIALIZED
        self.logger.info(f"{self.name} initialized.")

    @abstractmethod
    def process(self, packet: BasePacket) -> Optional[BasePacket]:
        """
        Process an incoming packet.

        Returns
        -------
        BasePacket | None
        """
        pass

    def shutdown(self) -> None:
        """
        Shutdown the agent.
        """

        self.status = AgentStatus.STOPPED
        self.logger.info(f"{self.name} stopped.")

        