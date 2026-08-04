import cv2

from services.face_service import FaceService

image = cv2.imread("data/images/market.jpg")   # Change extension if needed

service = FaceService()

faces = service.detect(image)

print("Faces found:", len(faces))

for face in faces:

    print(face.bbox)