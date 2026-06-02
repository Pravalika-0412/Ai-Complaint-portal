from fastapi.testclient import TestClient


def test_create_and_track_complaint(client: TestClient) -> None:
    response = client.post(
        "/complaint",
        json={
            "name": "Asha Rao",
            "email": "asha@example.com",
            "location": "Hyderabad",
            "description": "The road outside my home has a large pothole.",
        },
    )

    assert response.status_code == 201
    created = response.json()
    assert created["id"].startswith("CMP-")
    assert created["category"] == "Road Damage"
    assert created["status"] == "Pending"

    lookup = client.get(f"/complaint/{created['id'].lower()}")
    assert lookup.status_code == 200
    assert lookup.json()["id"] == created["id"]


def test_update_complaint_status_and_stats(client: TestClient) -> None:
    created = client.post(
        "/complaint",
        json={
            "name": "Ravi Kumar",
            "email": "ravi@example.com",
            "location": "Warangal",
            "description": "Broken road needs repair near the bus stop.",
        },
    ).json()

    update = client.put(f"/complaint/{created['id']}", json={"status": "Resolved"})
    assert update.status_code == 200
    assert update.json()["status"] == "Resolved"

    stats = client.get("/stats")
    assert stats.status_code == 200
    assert stats.json()["total"] == 1
    assert stats.json()["resolved"] == 1


def test_missing_complaint_returns_404(client: TestClient) -> None:
    response = client.get("/complaint/CMP-DOESNOT")

    assert response.status_code == 404
    assert response.json()["detail"] == "Complaint not found"
