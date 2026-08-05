from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/")
async def root():
    return {
        "project": "SentinelAI",
        "status": "running"
    }

@router.get("/")
async def health():

    return {

        "project": "SentinelAI",

        "status": "healthy"

    }
