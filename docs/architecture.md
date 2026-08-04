# SentinelAI Architecture

## Overview

SentinelAI is an AI-powered surveillance and investigation platform
built using a modular agent-based architecture. Each stage performs a
dedicated task and enriches the data before passing it to the next
stage.

``` text
                   React + Next.js Frontend
                            │
                  REST API / WebSocket
                            │
                     FastAPI Backend
                            │
                    Pipeline Manager
                            │
 ┌──────────────────────────────────────────────────────────────┐
 │                      AI Processing Pipeline                  │
 └──────────────────────────────────────────────────────────────┘
 Input Manager
        │
        ▼
 YOLO11 Detection
        │
        ▼
 ByteTrack Tracking
        │
        ▼
 Quality Assessment
        │
        ├───────────────┐
        │               │
 Quality Good      Low Quality
        │               │
        │        Enhancement Agent
        └───────────────┘
                │
                ▼
 Feature Extraction
                │
                ▼
 OCR (EasyOCR)
                │
                ▼
 Face Recognition (InsightFace)
                │
                ▼
 Re-ID
                │
                ▼
 Database Agent
                │
                ▼
 SQLite / PostgreSQL
                │
                ▼
 Investigation Engine
                │
                ▼
 Dashboard & AI Assistant
```

## Backend

-   FastAPI
-   Python
-   Agent-based pipeline
-   REST APIs
-   WebSocket support
-   Database integration

## Frontend

-   React
-   Next.js
-   TypeScript
-   Tailwind CSS
-   Real-time dashboard

## AI Modules

1.  Input Manager
2.  YOLO11 Detector
3.  ByteTrack Tracker
4.  Quality Assessment
5.  Enhancement Agent
6.  Feature Extraction
7.  OCR
8.  Face Recognition
9.  Re-ID
10. Database Agent
11. Investigation Engine

## Database

### Tables

-   tracks
-   features
-   events
-   analytics
-   faces (future)

## REST API

-   GET /status
-   GET /tracks
-   GET /events
-   GET /analytics
-   GET /stream
-   POST /investigation
-   POST /upload

## Future Enhancements

-   Multi-camera support
-   LLM Investigation Assistant
-   RAG-based evidence retrieval
-   Advanced event analytics
-   Edge deployment
-   GPU acceleration
