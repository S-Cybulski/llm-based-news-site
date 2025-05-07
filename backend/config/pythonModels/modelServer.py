from transformers import pipeline,  GPT2Tokenizer, GPT2Model
from flask import Flask, jsonify, request
from sentence_transformers import SentenceTransformer, util
from dotenv import load_dotenv
from os import getenv

load_dotenv()

app = Flask(__name__)

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
summariser = pipeline("summarization", model="facebook/bart-large-cnn")
similarity_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
gpt_model = GPT2Model.from_pretrained('gpt2')


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

@app.route('/api/summariseLocal', methods=['POST'])
def summarise():
    data = request.json
    summary = summariser(data['text'], max_length=130, min_length=30, do_sample=False)
    return jsonify({ 'summary_text': summary})

@app.route('/api/sentenceSimilarityLocal', methods=['POST'])
def sentence_similarity():
    data = request.json

    print("Data received for sentence similarity:", data['sentences'])

    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embeddings = model.encode(data['sentences'], batch_size=32, show_progress_bar=False)

    # Calculate cosine similarity of each sentence with the first one and return as an array
    cosine_similarities = {}
    for i in range(1, len(data['sentences'])):
        cosine_similarity = util.pytorch_cos_sim(embeddings[0], embeddings[i])
        cosine_similarities[data['sentences'][i]]=(cosine_similarity.item())

    return jsonify({ 'similarityArray': cosine_similarities})

@app.route('/api/gpt2Local', methods=['POST'])
def gpt2():
    data = request.json
    article1 = data['sourceArticle']
    article2 = data['comparisonArticle']
    prompt = "Compare these two articles and find the most similar sentences. \ " + article1 + "\ " + article2
    encoded_input = tokenizer(prompt, return_tensors='pt')
    output = model(**encoded_input)
    return jsonify({'comparison': output})

if __name__ == '__main__':
    try:
        print("Model server running on: localhost:", int(getenv("MODEL_PORT")))
        app.run(port=int(getenv("MODEL_PORT")))
    except:
        print("Error: Model server crashed")
