frontend:https://ai-complaint-portal-production-e633.up.railway.app/
backend:https://ai-complaint-portal-production.up.railway.app/

# AI Smart Complaint Portal

> Enterprise-ready React + FastAPI civic grievance management system for
> submitting, classifying, tracking, and resolving public complaints.

A full-stack hackathon project for civic grievance management. Citizens can submit complaints, the backend classifies each complaint with an NLP-based AI service, and admins can view, filter, analyze, and update complaint status.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, Recharts
- Backend: FastAPI, SQLAlchemy
- Database: SQLite
- AI: Hugging Face Transformers zero-shot classification with keyword fallback

## Features

- Modern responsive landing page
- Complaint submission form
- Automatic complaint categorization:
  - Road Damage
  - Water Supply
  - Electricity
  - Garbage
  - Street Lights
  - Others
- Unique complaint ID generation
- Complaint tracking by ID
- Admin dashboard with filters and status updates
- Complaint count cards
- Category analytics chart
- Dark mode
- Mobile responsive layout

## Folder Structure

```text
project/
|-- frontend/
|   |-- src/
|   |   |-- pages/
|   |   |-- components/
|   |   |-- services/
|   |   `-- App.jsx
|-- backend/
|   |-- main.py
|   |-- models.py
|   |-- database.py
|   |-- ai_classifier.py
|   |-- schemas.py
|   `-- routes/
|-- README.md
|-- CONTRIBUTING.md
|-- USER_MANUAL.md
`-- AGENTS.md
```

## Backend Setup

Prerequisites:

- Python 3.10 or newer
- Node.js 18 or newer for the frontend

1. Open a terminal in the project root.

2. Create and activate a Python virtual environment:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install backend dependencies:

```powershell
pip install -r requirements.txt
```

4. Optional: install the full Hugging Face AI runtime. This is a larger install because it includes PyTorch:

```powershell
pip install -r requirements-ai.txt
```

5. Start the FastAPI server:

```powershell
uvicorn main:app --reload
```

6. Open the API docs:

```text
http://localhost:8000/docs
```

The SQLite database is created automatically at `backend/complaints.db`.

## Frontend Setup

1. Open another terminal in the project root.

2. Install frontend dependencies:

```powershell
cd frontend
npm install
```

3. Start the React app:

```powershell
npm run dev
```

4. Open the frontend:

```text
http://localhost:5173
```
## Docker Deployment

If you have Docker installed, you can deploy both services locally with Docker Compose.

1. From the project root, build and start both services:

```powershell
docker compose up --build
```

2. Access the services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

3. Stop the services:

```powershell
docker compose down
```

This setup uses `backend/complaints.db` as a mounted volume so complaint data persists across container restarts.

## Railway Deployment

Railway can deploy this project using the root-level `Dockerfile`.

1. Make sure your Railway project is connected to this repository.
2. Set the service build path to the project root and use the root `Dockerfile`.
3. Railway will build the frontend and backend together, then start the app on the Railway `PORT`.
4. The frontend is served from the built static files and API requests are proxied from the same origin.

If you want to deploy just the backend or frontend as separate Railway services, use the existing `backend/Dockerfile` and `frontend/Dockerfile`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/complaint` | Submit a new complaint |
| GET | `/complaint/{id}` | Track one complaint |
| GET | `/complaints` | List complaints with optional filters |
| PUT | `/complaint/{id}` | Update complaint status |
| GET | `/stats` | Get dashboard statistics |

## Example Complaint

Input:

```text
Street light is not working near my house
```

Output category:

```text
Street Lights
```

## Notes

The AI classifier tries to load `facebook/bart-large-mnli` through Hugging Face Transformers when the optional AI dependencies are installed. If the model is unavailable, the app still works using the built-in keyword classifier. This keeps demos functional even without model downloads.

## Quality, Security, and Tests

Run the Python compliance checks from the repository root:

```powershell
pip install -r backend/requirements.txt
pip install ".[dev]"
ruff check backend tests
ruff format --check backend tests
mypy --config-file pyproject.toml
bandit -c pyproject.toml -r backend
detect-secrets scan --all-files --baseline .secrets.baseline
pip-audit -r backend/requirements.txt --strict
pytest --cov=backend --cov-report=term-missing --cov-report=xml --cov-fail-under=80
```

Install local pre-commit hooks:

```powershell
pre-commit install
pre-commit run --all-files
```

## Releases and Git Tags

Use semantic version tags for releases:

```powershell
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Generate the changelog from Git history with git-cliff:

```powershell
git cliff --config cliff.toml --output CHANGELOG.md
```
