# AI Smart Complaint Portal

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
