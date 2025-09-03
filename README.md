# Ad-Vision-AI

Ad-Vision-AI is a React + TypeScript frontend with a Python Flask backend that powers a marketing-focused AI assistant and competitor ads analysis toolkit. It integrates Google Gemini for text intelligence and optionally OpenAI DALL·E for image generation. The app includes mock competitor ad data and endpoints to analyze creatives and generate actionable insights.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn/ui, React Router
- Backend: Python, Flask, Flask-CORS
- AI: Google Gemini 1.5 Flash (text), optional OpenAI DALL·E (images)

## Repository Structure

```
Ad-Vision-AI/
  backend/                 # (Legacy) placeholder; active backend lives in /server
  server/                  # Flask API (main backend)
    app.py                 # Flask app with AI + mock ads endpoints
    requirements.txt       # Python dependencies
    env.example            # Example environment variables
  src/                     # React app source
    lib/chatApi.ts         # API client for chat/health endpoints
    components/, pages/, ui/ ...
  start-backend.sh         # Helper script to create venv and run backend
  vite.config.ts           # Vite config (dev server on port 8080)
  package.json             # Frontend scripts and deps
```

## Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Python 3.9+ (Python 3 recommended) and pip

## Environment Variables

Create `server/.env` based on `server/env.example`:

```
# Required for Gemini-based endpoints
GEMINI_APIKEY=your_gemini_api_key_here

# Optional: for DALL·E image generation endpoint
OPENAI_API_KEY=your_openai_api_key_here

# Optional: server port (default 5001)
PORT=5001
```

Note: `HUGGING_FACE_ACCESS_TOKEN` is present in the example but not used by the active Flask app.

## Install and Run

### 1) Backend

Using helper script (creates a venv under `server/venv`, installs deps, runs on port 5001):

```bash
chmod +x start-backend.sh
./start-backend.sh
```

Manual steps:

```bash
python3 -m venv server/venv
source server/venv/bin/activate
pip install -r server/requirements.txt
python server/app.py
```

Health check: open `http://localhost:5001/api/health`.

### 2) Frontend

Install dependencies and start Vite (dev server on port 8080):

```bash
npm install
npm run dev
# or: pnpm install && pnpm dev
```

Open `http://localhost:8080`.

#### Important (API base URL during development)

The frontend currently calls relative paths like `/api/...` (see `src/lib/chatApi.ts`). In dev, Vite runs on `http://localhost:8080` and the Flask server on `http://localhost:5001`. To make requests work in dev, choose one of:

1. Configure a Vite proxy (recommended):
   - Add a proxy to `vite.config.ts` under `server`:
     ```ts
     server: {
       host: "::",
       port: 8080,
       proxy: {
         "/api": "http://localhost:5001"
       }
     }
     ```
2. Use absolute URLs in the client:
   - Temporarily change fetch calls to `http://localhost:5001/api/...` while developing.
   - Or refactor to use an environment variable (e.g., `import.meta.env.VITE_API_BASE_URL`).

## API Overview (Flask, `server/app.py`)

- GET `/api/health` — API and Gemini configuration status
- POST `/api/chat` — Basic chat
  - Body: `{ "question": "string" }`
  - Returns: `{ "answer": "string" }`
- GET `/api/fetch-ads` — Mock ads with filters
  - Query: `q`, `country`, `impressions_min|max`, `spend_min|max`, `limit`, `offset`
- GET `/api/filter-options` — Options for business types, categories, countries
- POST `/api/analyze-ads` — Gemini-powered analysis of selected ads (falls back to mock)
  - Body: `{ "ads": [ ... ] }`
  - Returns: array of analyses with marketing, emotional, sentiment, hooks, performance
- POST `/api/generate-insights` — Gemini-powered insights from analyses (falls back to mock)
  - Body: `{ "analysis": [ ... ] }`
- POST `/api/generate-campaign-strategy` — Strategy JSON from insights + campaign data (mock if no key)
  - Body: `{ insights: {...}, campaignData: {...} }`
- POST `/api/generate-campaign-image` — Generate campaign image via DALL·E (mock URL without key)
  - Body: `{ campaign: {...}, insights: {...} }`

Notes:
- Most AI endpoints provide mock responses if `GEMINI_APIKEY`/`OPENAI_API_KEY` isn’t set.
- CORS is enabled with `*` in the backend.

## Frontend Notes

- Dev server: `vite.config.ts` uses port 8080.
- API client: see `src/lib/chatApi.ts`.
- UI: shadcn/ui components under `src/components/ui/`.

## Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "start:backend": "cd server && python app.py"
  }
}
```

You can also run the backend via the helper script `./start-backend.sh`.

## Production

1. Build frontend: `npm run build`
2. Serve built assets from a static host
3. Deploy Flask API separately (ensure `GEMINI_APIKEY`/`OPENAI_API_KEY` are set)
4. Point the frontend’s API base to your deployed backend (proxy or absolute URL)

## Troubleshooting

- 404 on `/api/...` in dev: set up the Vite proxy or use absolute backend URLs.
- 503 or error from AI endpoints: ensure `server/.env` contains valid `GEMINI_APIKEY` and the backend process has access to it.
- CORS errors: confirm you are calling the backend at the correct origin and that the backend is running.

## License

Proprietary/Unspecified. Add a license if needed.
