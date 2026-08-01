from services.tracker import TrackingService
import cv2

tracker = TrackingService("yolov8n.pt")

cap = cv2.VideoCapture("video.mp4")

success, frame = cap.read()

results = tracker.track(frame)

print(results[0].boxes)
print(results[0].boxes.id)

cap.release()