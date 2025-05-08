from transformers import pipeline,  pipeline, set_seed, AutoModelForCausalLM, AutoTokenizer
from flask import Flask, jsonify, request
from sentence_transformers import SentenceTransformer, util
from dotenv import load_dotenv
from os import getenv

load_dotenv()

app = Flask(__name__)

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
summariser = pipeline("summarization", model="facebook/bart-large-cnn")
similarity_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
fake_news_model = pipeline("text-classification", model="XSY/albert-base-v2-fakenews-discriminator")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

model_name = "Qwen/Qwen2.5-7B-Instruct"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained(model_name)

@app.route('/api/classifyLocal', methods=['POST'])
def classify():
    data = request.json

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

@app.route('/api/sentimentAnalysisLocal', methods=['POST'])
def sentimentAnalysis():
    data = request.json

    candidate_labels = ["neutral", "biased", "sensational", "opinionated"]

    results = classifier(data['text'], candidate_labels)

    fake_news = fake_news_model(data['title'])

    if fake_news[0]['label'] == 'LABEL_1':
        fake_news[0]['label'] = 'real'
    else:
        fake_news[0]['label'] = 'fake'

    highest_index = results['scores'].index(max(results['scores']))

    return jsonify({'category': results['labels'][highest_index], 'fake_news': fake_news[0]['label']})

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

@app.route('/api/qwenLocal', methods=['POST'])
def qwen():
    data = request.json

    article1 = data['sourceArticle']
    article2 = data['comparisonArticle']

    prompt = (
    "Compare the following two news articles. "
    "Provide bullet points listing:\n"
    "1. Similarities\n"
    "2. Differences\n\n"
    f"Article 1:\n{article1}\n\n"
    f"Article 2:\n{article2}"
    )

    messages = [
        {"role": "system", "content": "You are Qwen, created by Alibaba Cloud. You are a helpful assistant."},
        {"role": "user", "content": prompt}
    ]

    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

    generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=512
    )

    generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

    return jsonify({'comparison': response})

if __name__ == '__main__':
    try:
        print("Model server running on: localhost:", int(getenv("MODEL_PORT")))
        app.run(port=int(getenv("MODEL_PORT")))
    except:
        print("Error: Model server crashed")
