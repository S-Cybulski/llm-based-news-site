from sentence_transformers import SentenceTransformer, util
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/sentenceSimilarityLocal', methods=['POST'])

def sentence_similarity():

    data = request.json[sentences]

    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embeddings = model.encode(sentences)

    # Calculate cosine similarity of each sentence with the first one and return as an array
    cosine_similarities = {}
    for i in range(1, len(sentences)):
        cosine_similarity = util.pytorch_cos_sim(embeddings[0], embeddings[i])
        cosine_similarities[sentences[i]]=(cosine_similarity.item())

    return jsonify({ 'similarityArray': cosine_similarities})


if __name__ == '__main__':
    try:
        app.run(port=5002)
        print("Sentence similarity server running on: localhost:5002")
    except:
        print("Error: Sentence similarity server crashed")