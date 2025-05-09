import pytest
from modelServer import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_classifyLocal(client):
    response = client.post('/api/classifyLocal', json={
        "description": "The economy is facing inflation concerns due to global market volatility."
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "category" in data
    assert isinstance(data["category"], str)

def test_classifyLocal_missing_description(client):
    response = client.post('/api/classifyLocal', json={})
    assert response.status_code == 500 

def test_sentimentAnalysisLocal(client):
    response = client.post('/api/sentimentAnalysisLocal', json={
        "title": "Aliens spotted in Times Square!",
        "text": "Some say the event was shocking and unbelievable."
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "category" in data
    assert "fake_news" in data

def test_sentimentAnalysisLocal_missing_title_and_text(client):
    response = client.post('/api/sentimentAnalysisLocal', json={})
    assert response.status_code == 500

def test_summariseLocal(client):
    response = client.post('/api/summariseLocal', json={
        "text": '''It is turning out to be quite the month for trade deals of various complexions.

        There was the one with India earlier this week, now the pact with the US, and a new deal with the European Union is expected the week after next at a UK-EU summit in London.

        All sorts of arrangements, varying significantly, can huddle under the umbrella vocabulary of a trade deal and this trio of agreements is very different.

        Let's unpick a little of what we have learnt about this deal with America.

        Firstly, ministers are determined to project these deals in real world terms, surrounding themselves by workers and industry, not charts and percentages.
        '''
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "summary_text" in data
    assert isinstance(data["summary_text"], list)

def test_summariseLocal_missing_text(client):
    response = client.post('/api/summariseLocal', json={})
    assert response.status_code == 500 

def test_sentenceSimilarityLocal(client):
    response = client.post('/api/sentenceSimilarityLocal', json={
        "sentences": [
            "The weather is sunny today.",
            "It is a bright and clear day.",
            "Bananas are a popular fruit."
        ]
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "similarityArray" in data
    assert isinstance(data["similarityArray"], dict)

def test_sentenceSimilarityLocal_missing_sentences(client):
    response = client.post('/api/sentenceSimilarityLocal', json={})
    assert response.status_code == 500 

def test_qwenLocal(client):
    response = client.post('/api/qwenLocal', json={
        "sourceArticle": "Apple announced a new iPhone today.",
        "comparisonArticle": "Samsung unveiled its latest Galaxy model this week."
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "comparison" in data

def test_qwenLocal_missing_articles(client):
    response = client.post('/api/qwenLocal', json={})
    assert response.status_code == 500  