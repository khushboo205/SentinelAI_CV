"""
SentinelAI Visualizer
"""

import cv2

from core.packet import DetectionPacket


class Visualizer:

    def draw(self, packet: DetectionPacket):

        frame = packet.frame_packet.frame.copy()

        for detection in packet.detections:

            x1, y1, x2, y2 = map(int, detection.bbox)

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )

            label = f"{detection.class_name} {detection.confidence:.2f}"

            cv2.putText(
                frame,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2
            )

        return frame