from sentence_transformers import SentenceTransformer, util
from flask import Flask, jsonify, request

app = Flask(__name__)

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


if __name__ == '__main__':
    try:
        print("Sentence similarity server running on: localhost:5002")
        app.run(port=5002)
    except:
        print("Error: Sentence similarity server crashed")