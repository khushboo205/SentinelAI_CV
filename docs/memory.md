# SentinelAI Memory

## Purpose

This document records long-term architectural decisions, important
implementation choices, conventions, and project knowledge. It acts as a
persistent reference for developers so that future work remains
consistent.

------------------------------------------------------------------------

# Project Identity

**Project:** SentinelAI

**Mission:** Build an AI-powered surveillance and investigation platform
that transforms CCTV footage into searchable investigative intelligence.

------------------------------------------------------------------------

# Core Principles

-   Modular agent-based architecture
-   Single responsibility for each module
-   Pipeline-driven processing
-   Frontend and backend are decoupled
-   AI modules communicate through packets/models
-   Database access only through the repository layer

------------------------------------------------------------------------

# Current Technology Stack

## AI

-   YOLO11
-   ByteTrack
-   OpenCV
-   EasyOCR
-   InsightFace

Future: - OSNet / FastReID - Real-ESRGAN - Multinex - CodeFormer

------------------------------------------------------------------------

## Backend

-   Python
-   FastAPI
-   SQLite (MVP)

Future: - PostgreSQL - Redis

------------------------------------------------------------------------

## Frontend

-   React
-   Next.js
-   TypeScript
-   Tailwind CSS

------------------------------------------------------------------------

# Pipeline Memory

Current processing order:

``` text
Input Manager
    ↓
YOLO Detection
    ↓
ByteTrack Tracking
    ↓
Quality Assessment
    ↓
Enhancement (Conditional)
    ↓
Feature Extraction
    ↓
OCR
    ↓
Face Recognition
    ↓
Re-ID
    ↓
Database
```

------------------------------------------------------------------------

# Architectural Decisions

-   Enhancement should run only when image quality is below a threshold.
-   Database writes are handled by DatabaseAgent/Repository.
-   Agents should not directly communicate with each other.
-   Business logic belongs in services.
-   API layer should never contain AI logic.

------------------------------------------------------------------------

# Detection Model

Each Detection object may contain:

-   Bounding box
-   Confidence
-   Class name
-   Track ID
-   OCR results
-   Face information
-   Re-ID embedding
-   Quality score
-   Extracted attributes
-   Events

------------------------------------------------------------------------

# Future Features

-   Multi-camera support
-   Natural language investigation
-   Timeline reconstruction
-   Semantic search
-   Video report generation
-   RAG-based evidence retrieval
-   GPU deployment

------------------------------------------------------------------------

# Development Notes

-   Commit after every stable milestone.
-   Keep documentation synchronized.
-   Prefer reusable services over duplicated code.
-   Preserve backward compatibility where practical.

------------------------------------------------------------------------

# Current Focus

1.  Backend API integration (FastAPI)
2.  Frontend integration (React + Next.js)
3.  Enhancement module integration
4.  Database improvements
5.  Live dashboard
6.  AI Investigation Assistant
