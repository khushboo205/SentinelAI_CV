from database.repository import Repository


class EvidenceManager:

    def __init__(self):

        self.repository = Repository()

    # -------------------------------------------------------
    # Save Evidence
    # -------------------------------------------------------

    def save_evidence(

        self,

        case_id,

        track_id,

        frame_number,

        timestamp,

        original_image,

        enhanced_image,

        quality_score,

        risk_score

    ):

        self.repository.save_evidence(

            case_id,

            track_id,

            frame_number,

            timestamp,

            original_image,

            enhanced_image,

            quality_score,

            risk_score

        )

        return {

            "status": "success",

            "message": "Evidence Saved"

        }

    # -------------------------------------------------------
    # Get Evidence
    # -------------------------------------------------------

    def get_evidence(

        self,

        case_id

    ):

        evidence = self.repository.get_evidence(case_id)

        return {

            "case_id": case_id,

            "count": len(evidence),

            "evidence": evidence

        }

    # -------------------------------------------------------
    # Best Evidence
    # -------------------------------------------------------

    def get_best_evidence(

        self,

        case_id,

        limit=5

    ):

        evidence = self.repository.get_evidence(case_id)

        evidence = sorted(

            evidence,

            key=lambda x: (

                x["risk_score"],

                x["quality_score"]

            ),

            reverse=True

        )

        return evidence[:limit]