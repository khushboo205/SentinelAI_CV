from insightface.app import FaceAnalysis


class FaceService:

    def __init__(self):

        self.app = FaceAnalysis()

        self.app.prepare(
            ctx_id=0,
            det_size=(640, 640)
        )

    def detect(self, image):

        faces = self.app.get(image)

        return faces