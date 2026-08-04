from agents.input_manager import InputManagerAgent

agent = InputManagerAgent(
    "data/videos/input/sample.mp4"
)

agent.initialize()

while True:

    packet = agent.process()

    if packet is None:
        break

    print(
        packet.frame_id,
        packet.frame.shape
    )

agent.shutdown()