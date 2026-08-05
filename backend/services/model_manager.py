from ultralytics import YOLO


class ModelManager:

    def __init__(self):
        self.models = {}

    def load_yolo(self, model_name="yolo11n.pt"):

        if "yolo" not in self.models:

            print(f"Loading YOLO model: {model_name}")

            self.models["yolo"] = YOLO(model_name)

        return self.models["yolo"]

    def load_face(self):

        if "face" not in self.models:

            from insightface.app import FaceAnalysis

            app = FaceAnalysis()

            app.prepare(ctx_id=0)

            self.models["face"] = app

        return self.models["face"]

    def load_ocr(self):

        if "ocr" not in self.models:

            import easyocr

            self.models["ocr"] = easyocr.Reader(
                ["en"],
                gpu=False
            )

        return self.models["ocr"]
    
    def load_reid(self):

        if "reid" not in self.models:

            self.models["reid"] = None

        return self.models["reid"]

    def get(self, name):

        return self.models.get(name)