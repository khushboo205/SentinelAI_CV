from fastapi import APIRouter

from services.rule_service import RuleService

router = APIRouter(

    prefix="/rules",

    tags=["Rules"]

)

service = RuleService()


@router.post("/add")
async def add(rule: dict):

    return service.add(rule)


@router.post("/evaluate")
async def evaluate(observation: dict):

    return service.evaluate(observation)