from core.agent import BaseAgent
from core.packet import TrackingPacket


class SuspicionAgent(BaseAgent):

    def __init__(self):
        super().__init__("SuspicionAgent")

    def process(self, packet: TrackingPacket):

        for track in packet.tracks:

            detection = track.detection

            risk = 0
            
            reasons = []

            # -----------------------------------------
            # Score inferred events
            # -----------------------------------------

            events = getattr(detection, "events", [])

            for event in events:

                event_name = getattr(event, "event_type", "").upper()

                if event_name == "RUNNING":
                    risk += 30

                elif event_name == "LOITERING":
                    risk += 30

                elif event_name == "FACE_DETECTED":
                    risk += 10

                elif event_name == "OCR_FOUND":
                    risk += 10

                elif event_name == "OBJECT_ENTERED":
                    risk += 5

                reasons.append(event_name) 

                                        

            # -----------------------------------------
            # Face Bonus
            # -----------------------------------------

            if getattr(detection, "face_detected", False):

                risk += 10

                reasons.append("Face detected")

            # -----------------------------------------
            # Large Object
            # -----------------------------------------

            x1, y1, x2, y2 = detection.bbox

            area = abs(x2 - x1) * abs(y2 - y1)

            if area > 100000:

                risk += 10

                reasons.append("Large Object")

            # -----------------------------------------
            # Cap Maximum Risk
            # -----------------------------------------

            risk = min(risk, 100)

            # -----------------------------------------
            # Risk Level
            # -----------------------------------------

            if risk >= 80:

                level = "Critical"

            elif risk >= 50:

                level = "High"

            elif risk >= 25:

                level = "Medium"

            else:

                level = "Low"

            detection.risk_score = risk

            detection.priority = level

            detection.is_suspicious = risk >= 50

            detection.risk_reasons = list(set(reasons))

        return packet