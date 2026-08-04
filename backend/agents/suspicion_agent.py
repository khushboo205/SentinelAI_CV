from core.agent import BaseAgent


class SuspicionAgent(BaseAgent):

    def __init__(self):
        super().__init__("SuspicionAgent")

    def process(self, packet):

        for track in packet.tracks:

            d = track.detection

            d.risk_score = 0
            d.risk_reasons.clear()

            # Face detected
            if d.face_detected:
                d.risk_score += 5
                d.risk_reasons.append("Face detected")

            # OCR detected
            if d.ocr_text:
                d.risk_score += 10
                d.risk_reasons.append("OCR detected")

            # Large object
            area = d.attributes.get("area", 0)

            if area > 500000:
                d.risk_score += 5
                d.risk_reasons.append("Large object")

            # Dangerous classes
            dangerous = {
                "knife",
                "gun",
                "fire",
                "explosion",
                "weapon"
            }

            if d.class_name.lower() in dangerous:
                d.risk_score += 100
                d.risk_reasons.append("Dangerous object")

            d.is_suspicious = d.risk_score >= 20

        return packet