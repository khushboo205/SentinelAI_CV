from core.pipeline_factory import create_pipeline

VIDEO = "data/videos/input/test.mp4"

# Create pipeline only once
pipeline, input_agent = create_pipeline(VIDEO)

pipeline.initialize()

try:

    while True:

        packet = input_agent.process()

        if packet is None:
            print("\nVideo Finished.")
            break

        result = pipeline.process(packet)

        if result is None:
            continue

        if hasattr(result, "tracks"):

            print("\nFrame Processed")

            for track in result.tracks:

                print("-" * 60)
                print(f"Track ID : {track.track_id}")
                print(f"Class    : {track.detection.class_name}")

                print(
                    "Risk     :",
                    getattr(track.detection, "risk_score", 0)
                )

                print(
                    "Priority :",
                    getattr(track.detection, "priority", "LOW")
                )

                print(
                    "Reason   :",
                    getattr(track.detection, "reasoning", [])
                )

                print("-" * 60)

finally:

    pipeline.shutdown()

    print("\nPipeline Shutdown Complete.")