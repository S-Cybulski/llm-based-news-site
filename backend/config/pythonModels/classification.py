from transformers import pipeline
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/classifyLocal', methods=['POST'])

def classify():

    data = request.json

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    candidate_labels = [
                        "politics",
                        "business",
                        "technology",
                        "science",
                        "entertainment",
                        "sports",
                        "health",
                        "world news",
                    ]

    results = classifier(data['description'], candidate_labels)

    highest_index = results['scores'].index(max(results['scores']))

    return jsonify({'category': results['labels'][highest_index]})

if __name__ == '__main__':
    try:
        print("Classifer server running on: localhost:5003")
        app.run(port=5003)
    except:
        print("Error: Classifier server crashed")