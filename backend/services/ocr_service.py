import easyocr


class OCRService:

    def __init__(self):

        self.reader = easyocr.Reader(
            ["en"],
            gpu=False
        )

    def read(self, image):

        results = self.reader.readtext(image)

        texts = []

        for result in results:
            texts.append(result[1])

        return texts