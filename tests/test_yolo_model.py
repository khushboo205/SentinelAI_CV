from ultralytics import YOLO
import cv2

MODEL_PATH = "yolo11n.pt"   # or "models/detectors/yolo11n.pt"

try:
    print("Loading model...")
    model = YOLO(MODEL_PATH)
    print("✅ Model loaded successfully!")

    # Create a dummy image (black image)
    image = cv2.imread("data/images/test.jpg")

    if image is None:
        print("❌ Test image not found.")
        print("Place an image at: data/images/test.jpg")
        exit()

    print("Running inference...")
    results = model.predict(image, verbose=False)

    print("✅ Inference completed!")

    for result in results:
        print(f"Detections: {len(result.boxes)}")

        for box in result.boxes:
            print(
                f"Class: {int(box.cls)}, "
                f"Confidence: {float(box.conf):.2f}"
            )

except Exception as e:
    print("\n❌ ERROR")
    print(type(e).__name__)
    print(e)