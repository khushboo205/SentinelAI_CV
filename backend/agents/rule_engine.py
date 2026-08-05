from typing import Dict, List


class RuleEngine:

    def __init__(self):
        self.rules = []

    def add_rule(self, rule: Dict):
        self.rules.append(rule)

    def evaluate(self, observation: Dict):

        triggered = []

        for rule in self.rules:

            ok = True

            for key, value in rule["conditions"].items():

                if observation.get(key) != value:
                    ok = False
                    break

            if ok:

                triggered.append({

                    "rule": rule["name"],

                    "priority": rule["priority"]

                })

        return triggered