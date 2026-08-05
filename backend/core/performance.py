import time


class Performance:

    def __init__(self):

        self.data = {}

    def start(self, name):

        self.data[name] = time.time()

    def stop(self, name):

        elapsed = time.time() - self.data[name]

        print(f"{name}: {elapsed:.3f}s")