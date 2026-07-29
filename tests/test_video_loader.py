from services.video_loader import VideoLoader

loader = VideoLoader("data/videos/input/sample.mp4")

print(loader.width)
print(loader.height)
print(loader.fps)
print(loader.frame_count)

success, frame = loader.read()

print(success)
print(frame.shape)

loader.release()