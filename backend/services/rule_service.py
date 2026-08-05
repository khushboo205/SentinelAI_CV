from agents.rule_engine import RuleEngine

engine = RuleEngine()


class RuleService:

    def add(self, rule):

        engine.add_rule(rule)

        return {

            "status": "success"

        }

    def evaluate(self, observation):

        return engine.evaluate(observation)