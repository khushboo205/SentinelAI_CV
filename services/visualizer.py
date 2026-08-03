import cv2

from core.packet import TrackingPacket


class Visualizer:

    def draw(self, packet: TrackingPacket):

        frame = packet.frame_packet.frame.copy()

        for track in packet.tracks:

            x1, y1, x2, y2 = map(int, track.detection.bbox)

            label = f"{track.detection.class_name} #{track.track_id}"

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2,
            )

            cv2.putText(
                frame,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2,
            )

        return frame