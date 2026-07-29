"""
SentinelAI Message Bus

Provides publish/subscribe communication between agents.
"""

from __future__ import annotations

from collections import defaultdict
from typing import Callable, Dict, List

from core.packet import BasePacket


class MessageBus:
    """
    Simple publish/subscribe message bus.
    """

    def __init__(self):
        self._subscribers: Dict[str, List[Callable[[BasePacket], None]]] = defaultdict(list)

    def subscribe(self, topic: str, callback: Callable[[BasePacket], None]) -> None:
        """
        Subscribe a callback to a topic.
        """
        self._subscribers[topic].append(callback)

    def publish(self, topic: str, packet: BasePacket) -> None:
        """
        Publish a packet to all subscribers.
        """
        for callback in self._subscribers.get(topic, []):
            callback(packet)

    def clear(self) -> None:
        """
        Remove all subscriptions.
        """
        self._subscribers.clear()