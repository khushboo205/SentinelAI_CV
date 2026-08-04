# SentinelAI Development Rules

## 1. Architecture Rules

-   Maintain a modular, agent-based architecture.
-   Every agent has a single responsibility.
-   Agents communicate only through packets/models.
-   Business logic belongs in services, not agents.

## 2. Pipeline Rules

Pipeline order:

``` text
Input Manager
→ YOLO Detection
→ ByteTrack Tracking
→ Quality Assessment
→ Enhancement (conditional)
→ Feature Extraction
→ OCR
→ Face Recognition
→ Re-ID
→ Database
→ Investigation Engine
```

## 3. Backend Rules

-   Use Python 3.12+
-   Use FastAPI for APIs.
-   Keep API logic separate from AI logic.
-   All endpoints return JSON.
-   Use WebSockets for live updates.

## 4. Frontend Rules

-   React + Next.js only.
-   TypeScript for all components.
-   Tailwind CSS for styling.
-   Never hardcode mock data in production.
-   Consume backend APIs only.

## 5. AI Rules

-   Detector: YOLO11
-   Tracker: ByteTrack
-   OCR: EasyOCR
-   Face Recognition: InsightFace
-   Re-ID: OSNet/FastReID (future)
-   Enhancement should run only for low-quality frames.

## 6. Database Rules

-   Database writes occur only through DatabaseAgent/Repository.
-   No AI agent writes directly to SQLite.
-   Every track stores timestamp, class, confidence, quality, OCR, face
    status and extracted features.

## 7. Coding Standards

-   Use type hints.
-   Follow PEP 8.
-   Keep functions small.
-   Use logging instead of print for production.
-   Avoid duplicated code.

## 8. Git Rules

-   Commit after each completed milestone.
-   Use descriptive commit messages.
-   Never commit virtual environments or large model weights.

## 9. Testing Rules

-   Every new module must have a test.
-   Ensure the integrated pipeline passes before merging.
-   Fix failing tests before adding new features.

## 10. Performance Rules

-   Avoid duplicate inference.
-   Reuse embeddings when possible.
-   Process enhancement conditionally.
-   Optimize for real-time execution.

## 11. Documentation Rules

-   Update README after major changes.
-   Keep PRD, Architecture, and API documentation synchronized.
-   Document all public APIs.

## 12. Future Principles

-   Build for scalability.
-   Keep frontend and backend decoupled.
-   Prefer reusable services over duplicated logic.
-   Focus on maintainability, performance, and explainability.
