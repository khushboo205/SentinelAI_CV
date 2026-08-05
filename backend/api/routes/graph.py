from fastapi import APIRouter

from services.graph_builder import GraphBuilder

router = APIRouter(

    prefix="/graph",

    tags=["Graph"]

)

builder = GraphBuilder()


@router.get("/track/{track_id}")
async def graph(track_id: int):

    return builder.build_track_graph(track_id)


@router.get("/case/{case_id}")
async def case(case_id: int):

    return builder.build_case_graph(case_id)