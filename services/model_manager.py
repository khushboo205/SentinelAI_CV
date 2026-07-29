"""
SentinelAI Model Manager

Loads AI models only once and shares them across agents.
"""

from ultralytics import YOLO


class ModelManager:

    def __init__(self):
        self.models = {}

    def load_yolo(self, model_name="yolo11n.pt"):

        if "yolo" not in self.models:

            print(f"Loading YOLO model: {model_name}")

            self.models["yolo"] = YOLO(model_name)

        return self.models["yolo"]

    def get(self, name):

        return self.models.get(name)