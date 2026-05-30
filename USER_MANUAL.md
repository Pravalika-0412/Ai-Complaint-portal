# User Manual

## Citizen Flow

1. Open the application at `http://localhost:5173`.
2. Select `Submit`.
3. Enter:
   - Name
   - Email
   - Location
   - Complaint Description
4. Select `Submit Complaint`.
5. Save the generated complaint ID, for example `CMP-1A2B3C4D`.

The system automatically classifies the complaint into one of these categories: Road Damage, Water Supply, Electricity, Garbage, Street Lights, or Others.

## Track a Complaint

1. Select `Track`.
2. Enter the complaint ID.
3. Select `Search`.
4. View the current status:
   - Pending
   - In Progress
   - Resolved

## Admin Flow

1. Select `Admin`.
2. Review complaint count cards and category analytics.
3. Use category and status filters to narrow the table.
4. Update a complaint status from the status dropdown in the Action column.
5. Select `Refresh` to reload the latest data.

## Dark Mode

Use the moon or sun icon in the top navigation bar to switch between light mode and dark mode.

## Troubleshooting

- If the frontend shows network errors, confirm the backend is running at `http://localhost:8000`.
- If `npm run dev` fails, confirm Node.js 18 or newer is installed and available on PATH.
- If the backend fails to start, confirm dependencies were installed from `backend/requirements.txt`.
- If AI model loading is slow on the first request, wait for the Hugging Face model initialization. If the model is unavailable, the fallback classifier will categorize complaints using civic issue keywords.
