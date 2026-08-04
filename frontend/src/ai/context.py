from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

@dataclass
class SceneMetadata:
    blur_level: str = "Low"
    lighting: str = "Good"
    noise: str = "Low"
    weather: str = "Clear"
    face_visibility: str = "High"
    motion: str = "Low"
    summary: str = ""
    # Raw scores
    brightness_score: float = 0.0
    contrast_score: float = 0.0
    blur_score: float = 0.0
    noise_score: float = 0.0
    resolution: str = ""

@dataclass
class Detection:
    object_class: str
    confidence: float
    bbox: List[int]
    timestamp: str
    track_id: Optional[int] = None

@dataclass
class TrackedSubject:
    subject_id: str
    movement: str
    timestamp: str

@dataclass
class SceneMemory:
    previous_decisions: List[str] = field(default_factory=list)
    previous_alerts: List[str] = field(default_factory=list)
    last_frame_blur: float = 0.0
    last_frame_brightness: float = 0.0

@dataclass
class EntityGraph:
    nodes: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    edges: List[Dict[str, Any]] = field(default_factory=list)

    def add_node(self, node_id: str, label: str, properties: Dict[str, Any] = None):
        self.nodes[node_id] = {"label": label, "properties": properties or {}}

    def add_edge(self, source: str, target: str, relationship: str):
        self.edges.append({"source": source, "target": target, "relationship": relationship})

@dataclass
class PipelineContext:
    frame_data: Optional[str] = None  # Base64
    enhanced_frame_data: Optional[str] = None # Base64
    frame_cv: Any = None # np.ndarray
    enhanced_frame_cv: Any = None # np.ndarray
    
    scene_metadata: SceneMetadata = field(default_factory=SceneMetadata)
    detections: List[Detection] = field(default_factory=list)
    tracking: List[TrackedSubject] = field(default_factory=list)
    faces: List[Dict[str, Any]] = field(default_factory=list)
    reasoning_alerts: List[Dict[str, Any]] = field(default_factory=list)
    evidence: Dict[str, Any] = field(default_factory=dict)
    performance: Dict[str, Any] = field(default_factory=dict)
    
    scene_memory: SceneMemory = field(default_factory=SceneMemory)
    entity_graph: EntityGraph = field(default_factory=EntityGraph)
    
    # Internal state
    enhancement_model_selected: Optional[str] = None
    overall_confidence: float = 0.0
