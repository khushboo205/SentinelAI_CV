class EvidenceRanker:

    def rank(self, evidence):

        evidence.sort(

            key=lambda e: (

                e["priority"],

                e["confidence"]

            ),

            reverse=True

        )

        return evidence