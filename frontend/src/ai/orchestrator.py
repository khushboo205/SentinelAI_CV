import asyncio
from typing import Any
from src.ai.context import PipelineContext
from src.ai.event_bus import EventBus
from src.ai.enhancement.registry import EnhancementRegistry
from src.ai.agents import (
    QualityAgent, PlannerAgent, EnhancementAgent, DetectionAgent,
    TrackingAgent, FaceAgent, ReasoningAgent, EvidenceAgent,
    PerformanceAgent, AlertAgent, BenchmarkAgent
)

class AIOrchestrator:
    def __init__(self):
        self.event_bus = EventBus()
        self.registry = EnhancementRegistry()
        
        self.quality_agent = QualityAgent(self.event_bus)
        self.planner_agent = PlannerAgent(self.event_bus, self.registry)
        self.enhancement_agent = EnhancementAgent(self.event_bus, self.registry)
        self.detection_agent = DetectionAgent(self.event_bus)
        self.tracking_agent = TrackingAgent(self.event_bus)
        self.face_agent = FaceAgent(self.event_bus)
        self.reasoning_agent = ReasoningAgent(self.event_bus)
        self.evidence_agent = EvidenceAgent(self.event_bus)
        self.performance_agent = PerformanceAgent(self.event_bus)
        self.alert_agent = AlertAgent(self.event_bus)
        self.benchmark_agent = BenchmarkAgent(self.event_bus)

    async def process_media(self, frame_cv: Any) -> PipelineContext:
        context = PipelineContext(frame_cv=frame_cv)
        
        self.performance_agent.start_timer()

        # Execute Pipeline Sequence
        await self.quality_agent.run(context)
        await self.planner_agent.run(context)
        await self.enhancement_agent.run(context)
        await self.detection_agent.run(context)
        await self.tracking_agent.run(context)
        await self.face_agent.run(context)
        await self.reasoning_agent.run(context)
        await self.evidence_agent.run(context)
        await self.alert_agent.run(context)
        await self.benchmark_agent.run(context)
        await self.performance_agent.run(context)
        
        return context
