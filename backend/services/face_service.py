from services.model_manager import ModelManager


class FaceService:

    def __init__(self):

        manager = ModelManager()

        self.app = manager.load_face()

    def detect(self, image):

        faces = self.app.get(image)

        return faces