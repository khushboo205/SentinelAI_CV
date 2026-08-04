import cv2

from services.quality_assessor import QualityAssessor

image = cv2.imread("img.jpg")

qa = QualityAssessor()

blurry, score = qa.is_blurry(image)

print("Blur Score :", score)
print("Blurry     :", blurry)