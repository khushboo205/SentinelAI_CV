# SentinelAI System Design

## Design Philosophy

SentinelAI follows a modular, scalable, and agent-based architecture.
Each component has a single responsibility and communicates through
structured packets and shared models. The system is designed to support
real-time processing, future AI upgrades, and distributed deployment.

------------------------------------------------------------------------

# High-Level Design

``` text
                    React + Next.js
                          │
                REST API / WebSocket
                          │
                    FastAPI Backend
                          │
                  Pipeline Manager
                          │
   ┌───────────────────────────────────────────┐
   │              AI Agent Pipeline            │
   └───────────────────────────────────────────┘
Input → Detection → Tracking → Quality
                         │
              Low Quality?
                  │
        No ───────┴────── Yes
                  │
             Enhancement
                  │
Feature → OCR → Face → Re-ID → Database
                  │
           Investigation Engine
                  │
             Dashboard / Reports
```

------------------------------------------------------------------------

# Design Principles

-   Single Responsibility per Agent
-   Loose Coupling through Packets
-   Service layer contains business logic
-   Repository pattern for database access
-   API layer separated from AI processing
-   Frontend separated from backend
-   Extensible model interfaces

------------------------------------------------------------------------

# Component Design

## Frontend

-   React
-   Next.js
-   TypeScript
-   Tailwind CSS

Responsibilities: - Live dashboard - Investigation UI - Analytics -
Camera management - Settings

------------------------------------------------------------------------

## Backend

-   FastAPI
-   Pipeline orchestration
-   REST APIs
-   WebSockets
-   Video streaming

------------------------------------------------------------------------

## AI Layer

### Input Manager

Captures frames from video, webcam, or RTSP.

### Detection

YOLO11 detects objects and creates Detection models.

### Tracking

ByteTrack assigns persistent IDs across frames.

### Quality Assessment

Evaluates blur, brightness, and image quality.

### Enhancement

Runs only when quality is below threshold.

### Feature Extraction

Generates geometric and semantic attributes.

### OCR

Extracts visible text.

### Face Recognition

Detects faces and generates embeddings.

### Re-ID

Produces appearance embeddings for future cross-camera matching.

### Database Agent

Persists tracks, features, OCR, and events.

------------------------------------------------------------------------

# Data Flow

``` text
Frame
 ↓
FramePacket
 ↓
DetectionPacket
 ↓
TrackingPacket
 ↓
Enhanced TrackingPacket
 ↓
Database
 ↓
API
 ↓
Frontend
```

------------------------------------------------------------------------

# Folder Design

``` text
SentinelAI/
├── backend/
│   ├── agents/
│   ├── services/
│   ├── database/
│   ├── api/
│   ├── core/
│   ├── config/
│   └── tests/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── public/
│   └── styles/
└── docs/
```

------------------------------------------------------------------------

# Database Design

Core tables: - tracks - features - events - analytics - faces (future)

------------------------------------------------------------------------

# API Design

-   GET /status
-   GET /tracks
-   GET /events
-   GET /analytics
-   GET /stream
-   POST /investigation
-   POST /upload

------------------------------------------------------------------------

# Scalability

Future enhancements: - PostgreSQL - Redis caching - Multi-camera
processing - GPU acceleration - Kubernetes deployment - Distributed
inference

------------------------------------------------------------------------

# Security

-   JWT authentication
-   Role-based access control
-   HTTPS
-   Secure file uploads
-   API validation
-   Audit logging

------------------------------------------------------------------------

# Design Goals

-   Modular
-   Maintainable
-   Scalable
-   Real-time capable
-   Production-ready
-   Easy to extend with new AI models
