from datetime import datetime


class PipelineMonitor:

    def __init__(self):

        self.history = []

    def log(self, agent, packet):

        self.history.append({

            "agent": agent,

            "time": datetime.now().isoformat(),

            "packet": type(packet).__name__

        })

    def report(self):

        return self.history