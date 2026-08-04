import asyncio
from typing import Callable, Dict, List, Any

class EventBus:
    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, callback: Callable):
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(callback)

    async def publish(self, event_type: str, *args, **kwargs):
        if event_type in self._subscribers:
            callbacks = self._subscribers[event_type]
            # Execute all callbacks concurrently
            await asyncio.gather(*(callback(*args, **kwargs) for callback in callbacks))
