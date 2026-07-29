from enum import Enum


class AgentStatus(Enum):
    CREATED = "CREATED"
    INITIALIZED = "INITIALIZED"
    RUNNING = "RUNNING"
    STOPPED = "STOPPED"
    ERROR = "ERROR"


class PacketType(Enum):
    FRAME = "FRAME"
    DETECTION = "DETECTION"
    TRACKING = "TRACKING"
    REID = "REID"
    FEATURE = "FEATURE"