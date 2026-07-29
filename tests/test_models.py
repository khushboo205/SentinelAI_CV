from core.models import Detection, Track

person = Detection(
    class_id=0,
    class_name="person",
    confidence=0.95,
    bbox=[100, 150, 250, 500],
)

track = Track(
    track_id=1,
    detection=person,
)

print(person)
print(track)