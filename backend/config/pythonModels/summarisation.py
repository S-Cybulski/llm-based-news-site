from transformers import pipeline
from flask import Flask, jsonify, request

app = Flask(__name__)
summariser = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/api/summariseLocal', methods=['POST'])

def summarise():
    data = request.json
    summary = summariser(data['text'], max_length=130, min_length=30, do_sample=False)
    return jsonify({ 'summary_text': summary})

if __name__ == '__main__':
    try:
        app.run(port=5001)
        print("Summarisation Server running on: localhost:5001")
    except:
        print("Error: Summarisation server crashed")