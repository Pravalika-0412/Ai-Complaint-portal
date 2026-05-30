# AGENTS.md

This file helps future coding agents and teammates understand the project quickly.

## Project Summary

AI Smart Complaint Portal is a React + FastAPI + SQLite application for civic complaint submission, AI categorization, tracking, and admin management.

## Important Commands

Prerequisites: Python 3.10+ and Node.js 18+.

Backend:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Optional full NLP runtime:
pip install -r requirements-ai.txt
uvicorn main:app --reload
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

## Key Files

- `backend/main.py`: FastAPI app setup and CORS
- `backend/routes/complaints.py`: Complaint API endpoints
- `backend/ai_classifier.py`: Hugging Face classification and keyword fallback
- `backend/models.py`: SQLAlchemy complaint model
- `backend/database.py`: SQLite connection
- `frontend/src/services/api.js`: Axios API client
- `frontend/src/pages/ComplaintForm.jsx`: Citizen submission flow
- `frontend/src/pages/TrackComplaint.jsx`: Complaint tracking flow
- `frontend/src/pages/AdminDashboard.jsx`: Admin filters, analytics, and status updates

## Data Model

The `complaints` table contains:

- `id`
- `name`
- `email`
- `location`
- `description`
- `category`
- `status`
- `created_at`

## Implementation Notes

- Complaint IDs use the format `CMP-XXXXXXXX`.
- The allowed statuses are `Pending`, `In Progress`, and `Resolved`.
- The backend creates the SQLite database automatically.
- The frontend assumes the API is available at `http://localhost:8000`, unless `VITE_API_BASE_URL` is set.
- Do not remove the classifier fallback. It is important for offline demos and CI environments.
- Keep heavyweight NLP dependencies in `backend/requirements-ai.txt` unless the project owner asks for a single dependency file.
