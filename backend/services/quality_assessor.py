import cv2


class QualityAssessor:

    def blur_score(self, image):

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        return cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()


    def is_blurry(
        self,
        image,
        threshold=100
    ):

        score = self.blur_score(image)

        return score < threshold, score