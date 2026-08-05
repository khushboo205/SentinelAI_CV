from math import sqrt

from core.agent import BaseAgent
from core.packet import TrackingPacket


class BehaviorAgent(BaseAgent):

    def __init__(self):
        super().__init__("BehaviorAgent")

        self.track_history = {}

        # Lower thresholds for demo
        self.RUNNING_THRESHOLD = 5
        self.LOITERING_FRAMES = 30

    def process(self, packet: TrackingPacket):

        for track in packet.tracks:

            detection = track.detection

            # -------------------------------------
            # Only classify people
            # -------------------------------------

            if detection.class_name != "person":

                detection.behavior = {

                    "name": "UNKNOWN",

                    "speed": 0,

                    "direction": "unknown",

                    "zone": "unknown",

                    "dwell_time": 0,

                    "running": False,

                    "loitering": False,

                    "restricted": False

                }

                print(
                    f"Track {detection.track_id} ({detection.class_name}) -> {detection.behavior}"
                )

                continue

            track_id = detection.track_id

            x1, y1, x2, y2 = detection.bbox

            # Center of bounding box
            cx = (x1 + x2) / 2
            cy = (y1 + y2) / 2

            # -------------------------------------
            # First frame of this track
            # -------------------------------------

            if track_id not in self.track_history:

                self.track_history[track_id] = {

                    "last_position": (cx, cy),

                    "frames": 1,

                    "speed": 0,

                    "direction": "unknown"

                }

                detection.behavior = {

                    "name": "WALKING",

                    "speed": 0,

                    "direction": "unknown",

                    "zone": "unknown",

                    "dwell_time": 1,

                    "running": False,

                    "loitering": False,

                    "restricted": False

                }

                print(
                    f"Track {track_id} ({detection.class_name}) -> {detection.behavior}"
                )

                continue

            # -------------------------------------
            # Existing track
            # -------------------------------------

            history = self.track_history[track_id]

            last_x, last_y = history["last_position"]

            dx = cx - last_x
            dy = cy - last_y

            speed = sqrt(dx * dx + dy * dy)

            if abs(dx) > abs(dy):

                direction = "right" if dx > 0 else "left"

            else:

                direction = "down" if dy > 0 else "up"

            history["last_position"] = (cx, cy)
            history["frames"] += 1
            history["speed"] = speed
            history["direction"] = direction

            running = speed > self.RUNNING_THRESHOLD

            loitering = (
                history["frames"] >= self.LOITERING_FRAMES
                and speed < 2
            )

            if running:

                behavior_name = "RUNNING"

            elif loitering:

                behavior_name = "LOITERING"

            else:

                behavior_name = "WALKING"

            detection.behavior = {

                "name": behavior_name,

                "speed": round(speed, 2),

                "direction": direction,

                "zone": "unknown",

                "dwell_time": history["frames"],

                "running": running,

                "loitering": loitering,

                "restricted": False

            }

            print(
                f"Track {track_id} ({detection.class_name}) -> {detection.behavior}"
            )

        return packet