import cv2

from agents.input_manager import InputManagerAgent
from agents.detector import DetectorAgent
from services.visualizer import Visualizer


def main():

    input_agent = InputManagerAgent(
        "data/videos/input/sample.mp4"
    )

    detector = DetectorAgent(
        "models/detectors/yolo11n.pt"
    )

    visualizer = Visualizer()

    input_agent.initialize()
    detector.initialize()

    while True:

        frame_packet = input_agent.process()

        if frame_packet is None:
            break

        detection_packet = detector.process(frame_packet)

        image = visualizer.draw(detection_packet)

        cv2.imshow("SentinelAI", image)

        key = cv2.waitKey(1) & 0xFF

        # Exit on Q
        if key == ord("q"):
            break

        # Exit if window is closed
        if cv2.getWindowProperty("SentinelAI", cv2.WND_PROP_VISIBLE) < 1:
            break

    input_agent.shutdown()
    detector.shutdown()

    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()