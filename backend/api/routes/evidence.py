from fastapi import APIRouter

from services.evidence_manager import EvidenceManager

router = APIRouter(

    prefix="/evidence",

    tags=["Evidence"]

)

manager = EvidenceManager()


@router.get("/{case_id}")
async def evidence(case_id: int):

    return manager.get_evidence(case_id)


@router.get("/best/{case_id}")
async def best(case_id: int):

    return manager.get_best_evidence(case_id)