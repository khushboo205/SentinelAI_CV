from fastapi import APIRouter

from services.case_manager import CaseManager

router = APIRouter(
    prefix="/cases",
    tags=["Cases"]
)

manager = CaseManager()


@router.get("/")
async def list_cases():

    return manager.list_cases()


@router.get("/{case_id}")
async def get_case(case_id: int):

    return manager.get_case(case_id)


@router.post("/create")
async def create_case(payload: dict):

    return manager.create_case(

        payload["title"],

        payload.get("description", ""),

        payload.get("priority", "MEDIUM"),

        payload.get("assigned_officer")

    )


@router.post("/{case_id}/close")
async def close_case(case_id: int):

    return manager.close_case(case_id)