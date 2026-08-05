from database.repository import Repository


class CaseManager:

    def __init__(self):

        self.repository = Repository()

    # =====================================================
    # CASE MANAGEMENT
    # =====================================================

    def create_case(

        self,

        title,

        description,

        priority="MEDIUM",

        assigned_officer=None

    ):

        self.repository.create_case(

            title,

            description,

            priority,

            assigned_officer

        )

        return {

            "status": "success",

            "message": "Case created"

        }

    def get_case(

        self,

        case_id

    ):

        return self.repository.get_case(case_id)

    def list_cases(self):

        return self.repository.list_cases()

    def close_case(

        self,

        case_id

    ):

        self.repository.close_case(case_id)

        return {

            "status": "success",

            "message": "Case closed"

        }

    def assign_case(

        self,

        case_id,

        officer

    ):

        self.repository.assign_case(

            case_id,

            officer

        )

        return {

            "status": "success",

            "message": "Officer assigned"

        }

    # =====================================================
    # EVIDENCE
    # =====================================================

    def add_evidence(

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

            "message": "Evidence added"

        }

    def get_evidence(

        self,

        case_id

    ):

        return self.repository.get_evidence(case_id)

    # =====================================================
    # NOTES
    # =====================================================

    def add_note(

        self,

        case_id,

        author,

        note

    ):

        self.repository.add_note(

            case_id,

            author,

            note

        )

        return {

            "status": "success",

            "message": "Note added"

        }

    def get_notes(

        self,

        case_id

    ):

        return self.repository.get_notes(case_id)

    # =====================================================
    # RECOMMENDATIONS
    # =====================================================

    def add_recommendation(

        self,

        case_id,

        recommendation,

        confidence

    ):

        self.repository.save_recommendation(

            case_id,

            recommendation,

            confidence

        )

        return {

            "status": "success",

            "message": "Recommendation stored"

        }

    def get_recommendations(

        self,

        case_id

    ):

        return self.repository.get_recommendations(case_id)

    # =====================================================
    # RELATIONSHIPS
    # =====================================================

    def add_relationship(

        self,

        source_type,

        source_id,

        target_type,

        target_id,

        relation

    ):

        self.repository.save_relationship(

            source_type,

            source_id,

            target_type,

            target_id,

            relation

        )

        return {

            "status": "success",

            "message": "Relationship saved"

        }

    def get_relationships(

        self,

        source_id

    ):

        return self.repository.get_relationships(source_id)

    # =====================================================
    # DASHBOARD SUMMARY
    # =====================================================

    def get_dashboard(self):

        return {

            "tracks": self.repository.count_tracks(),

            "faces": self.repository.count_faces(),

            "events": self.repository.count_events(),

            "risk": self.repository.count_risk()

        }