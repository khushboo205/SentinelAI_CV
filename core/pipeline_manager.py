class PipelineManager:

    def __init__(self, agents):

        self.agents = agents

    def initialize(self):

        for agent in self.agents:
            agent.initialize()

    def run(self):

        packet = self.agents[0].process()

        for agent in self.agents[1:]:

            packet = agent.process(packet)

        return packet

    def shutdown(self):

        for agent in reversed(self.agents):

            agent.shutdown()