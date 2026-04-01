from fastapi.testclient import TestClient
from main import app

# TestClient lets us send fake HTTP requests to our app
# No need to actually start the server — it simulates requests
client = TestClient(app)


# TEST 1: Does the root endpoint work?
def test_root():
    response = client.get("/")
    # assert means "this MUST be true, otherwise the test fails"
    assert response.status_code == 200
    assert response.json() == {"message": "TFT Comp Builder API"}


# TEST 2: Does the champions endpoint return data?
def test_get_champions():
    response = client.get("/champions")
    assert response.status_code == 200
    # The response should be a list
    assert isinstance(response.json(), list)


# TEST 3: Does the traits endpoint return data?
def test_get_traits():
    response = client.get("/traits")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


# TEST 4: Does getting a single champion work?
def test_get_single_champion():
    response = client.get("/champions/1")
    assert response.status_code == 200
    data = response.json()
    # Champion should have these fields
    assert "name" in data
    assert "cost" in data


# TEST 5: What happens when we request a champion that doesn't exist?
def test_get_champion_not_found():
    response = client.get("/champions/99999")
    assert response.status_code == 200
    # Currently returns null — we'll improve this later with error handling
    assert response.json() is None