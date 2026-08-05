from fastapi import APIRouter

from services.query_engine import QueryEngine

router = APIRouter(
    prefix="/query",
    tags=["Query"]
)

engine = QueryEngine()


@router.get("/track/{track_id}")
async def track(track_id: int):

    return engine.search_track(track_id)


@router.get("/ocr/{keyword}")
async def ocr(keyword: str):

    return engine.search_ocr(keyword)


@router.get("/risk")
async def risk():

    return engine.high_risk()


@router.get("/dashboard")
async def dashboard():

    return engine.dashboard()