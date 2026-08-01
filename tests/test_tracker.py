import cv2
from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolov8n.pt")

# Open video
cap = cv2.VideoCapture("video.mp4")   # Change path if needed

while cap.isOpened():
    success, frame = cap.read()

    if not success:
        break

    results = model.track(
        source=frame,
        persist=True,
        conf=0.35,
        verbose=False,
    )

    annotated = results[0].plot()

    if results[0].boxes.id is not None:
        print("Track IDs:", results[0].boxes.id.cpu().numpy())

    cv2.imshow("ByteTrack Test", annotated)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()