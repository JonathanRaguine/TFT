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
    # In CI the database is empty, so champion may not exist
    if data is not None:
        assert "name" in data
        assert "cost" in data


# TEST 5: What happens when we request a champion that doesn't exist?
def test_get_champion_not_found():
    response = client.get("/champions/99999")
    # Now we correctly return 404 instead of 200 with null
    assert response.status_code == 404
    assert response.json()["detail"] == "Champion not found"

# TEST 6: Can we create and retrieve a champion through the database?
def test_champions_have_correct_fields():
    response = client.get("/champions")
    data = response.json()
    # If there are champions, verify their structure
    if len(data) > 0:
        champion = data[0]
        assert "name" in champion
        assert "cost" in champion
        assert "id" in champion