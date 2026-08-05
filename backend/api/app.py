from fastapi import FastAPI
from api.routes.pipeline import router as pipeline_router
from api.routes.upload import router as upload_router
from api.routes.investigation import router as investigation_router
from api.routes.cases import router as case_router
from api.routes.health import router as health_router
from api.routes.tracks import router as tracks_router
from database.init_db import initialize_database
from api.routes.timeline import router as timeline_router
from api.routes.evidence import router as evidence_router
from api.routes.query import router as query_router
from api.routes.graph import router as graph_router
from api.routes.rules import router as rules_router


app = FastAPI(title="SentinelAI")
initialize_database()

@app.get("/")
async def root():

    return {
        "project": "SentinelAI",
        "status": "running",
        "docs": "/docs"
    }

app.include_router(
    health_router,
    prefix="/health",
    tags=["Health"]
)

app.include_router(
    upload_router,
    prefix="/upload",
    tags=["Upload"]
)

app.include_router(
    investigation_router,
    prefix="/investigation",
    tags=["Investigation"]
)

app.include_router(
    pipeline_router,
    prefix="/pipeline",
    tags=["Pipeline"]
)

app.include_router(
    case_router,
    prefix="/cases",
    tags=["Cases"]
    )

app.include_router(
    tracks_router,
    prefix="/tracks",
    tags=["Tracks"]
)

app.include_router(timeline_router)

app.include_router(evidence_router)

app.include_router(query_router)

app.include_router(graph_router)

app.include_router(rules_router)