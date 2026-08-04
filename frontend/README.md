# SentinelAI: Intelligent Multi-Agent Forensic Investigation Platform

> **"Turning unusable surveillance footage into actionable investigative evidence."**

## 🚨 The Problem
Every day, thousands of crimes are recorded on CCTV. However, investigators face significant challenges:
- Cameras are often low-quality (480p/720p).
- Footage is blurry due to motion or obscured by bad lighting/weather.
- Manual review of hundreds of hours of footage is painstakingly slow.
- Existing tools require switching between multiple disjointed applications (one for enhancement, another for detection, another for reporting).

The result? Valuable evidence is missed, and investigations take hours or days to process.

## 💡 The Solution
SentinelAI acts as an **AI Investigation Team**. Instead of being just another "image enhancer", SentinelAI provides an end-to-end intelligent multi-agent pipeline that decides the best enhancement strategy, extracts relevant objects, tracks suspects, and explains every step.

Upload your raw CCTV footage, and SentinelAI will automatically:
1. Find important frames.
2. Intelligently enhance only the necessary frames based on specific quality issues (blur, low light, noise).
3. Detect faces, vehicles, and critical objects.
4. Track suspects across the timeline.
5. Generate a comprehensive investigation report.

## 🤖 The Multi-Agent Pipeline

SentinelAI utilizes a Multi-Agent architecture to process evidence like a real investigation team:

1. **Frame Selection Agent:** Extracts keyframes, drops duplicates, and identifies motion to isolate important moments.
2. **Quality Analysis Agent:** Assesses blur, lighting, and noise to intelligently prescribe the necessary enhancement models (saving compute and avoiding over-processing).
3. **Enhancement Agent:** Applies targeted AI restoration (e.g., Real-ESRGAN for upscaling, Zero-DCE for low light) based on the Quality Agent's assessment.
4. **Detection Agent:** Identifies persons, vehicles, license plates, and suspicious objects.
5. **Tracking Agent:** Links temporal bounding boxes to create movement timelines of subjects.
6. **Evidence Agent:** Synthesizes all data into a cohesive, exportable forensic report with explainable AI logs.

## ✨ Key Features
- **End-to-End Workflow:** From raw footage to a finalized investigation summary in one platform.
- **Explainable AI (XAI):** Displays the exact detected problems (e.g., "Motion Blur") and the specific models applied (e.g., "Real-ESRGAN"), along with confidence scores.
- **Evidence Integrity:** Original media is always preserved; enhancements are logged as reversible layers.
- **Automated Timeline:** Generates a chronological track of suspect and vehicle movements.
- **Frosted Glass UI:** A visually stunning, modern dashboard designed for high-stakes operational environments.

## 🛠️ Tech Stack
- **Frontend:** React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Backend:** Node.js, Express, Multer
- **AI / Multi-Agent Orchestration:** Google Gemini API (`@google/genai` SDK) for intelligent agent simulation and report generation.
- **Build Tooling:** Vite, ESBuild, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sentinel-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key (and optionally your Groq API key as a fallback):
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   GROQ_API_KEY="your_groq_api_key_here"
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## 🏗️ Production Build

To build the application for production (compiling both the React SPA and the Express backend):

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🔮 Future Scope
Given a longer development timeline (6–12 months), SentinelAI can evolve into a full-city public safety platform:
- **Live CCTV stream analysis** with real-time alerting.
- **Cross-camera tracking** across different locations in a city.
- **Court-ready evidence management** with secure cryptographic audit logs.
- **Integration with drone footage** for disaster search assistance.
- **Natural Language Search** (e.g., "Find all white SUVs between 8 PM and 10 PM").

---

*Built for hackathons, designed for impact.*
