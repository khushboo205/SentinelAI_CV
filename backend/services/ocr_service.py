from services.model_manager import ModelManager

class OCRService:

    def __init__(self):

        manager = ModelManager()

        self.reader = manager.load_ocr()

    def read(self, image):

        results = self.reader.readtext(image)

        texts = []

        for result in results:
            texts.append(result[1])

        return texts