from core.pipeline import Pipeline


class PipelineManager:

    def __init__(self, agents):

        self.pipeline = Pipeline()

        for agent in agents:
            self.pipeline.add_agent(agent)

    def initialize(self):

        self.pipeline.initialize()

    def process(self, packet):

        return self.pipeline.run(packet)

    def shutdown(self):

        self.pipeline.shutdown()