import dotenv from "dotenv";

dotenv.config();

const defaultParameters = {
    clean_up_tokenization_spaces: true,
    truncation: "longest_first",
    generate_parameters: {},
};

export async function query(data, parameters = defaultParameters) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: {
                    Authorization: "Bearer " + process.env.HUGGING_FACE_API,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: data }),
            }
        );

        const result = await response.json();
        return result[0].summary_text;
    } catch (error) {
        console.error(`Error with query: ${error.message}`);
        process.exit(1);
    }
}

export async function localSummarise(text) {
    const response = await fetch("http://localhost:5001/api/summariseLocal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    });

    const data = await response.json();
    return data.summary_text[0].summary_text;
}

export async function classifyArticleLocal(description) {
    console.log("DEBUG: " + description);
    const response = await fetch("http://localhost:5003/api/classifyLocal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description }),
    });
    const result = await response.json();
    console.log("DEBUG:", result);
    return result.category;
}

export async function classifyArticle(data) {
    try {
        const body = {
            inputs: data,
            parameters: {
                candidate_labels: [
                    "politics",
                    "business",
                    "technology",
                    "science",
                    "entertainment",
                    "sports",
                    "health",
                    "world news",
                ],
            },
        };
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
            {
                headers: {
                    Authorization: "Bearer " + process.env.HUGGING_FACE_API,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            }
        );
        const result = await response.json();

        const highestIndex = result.scores.indexOf(Math.max(...result.scores));

        return result.labels[highestIndex];
    } catch (error) {
        console.error(`Error in classifying article: ${error.message}`);
        process.exit(1);
    }
}

export async function embedSentence(sentences, source_sentence) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/sentence-transformers/all-mpnet-base-v2",
            {
                headers: {
                    Authorization: "Bearer " + process.env.HUGGING_FACE_API,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: {
                        sentences: sentences,
                        source_sentence: source_sentence,
                    },
                }),
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error in sentence transformer: ${error.message}`);
        process.exit(1);
    }
}

export async function getSentenceSimilarity(
    sourceSentence,
    comparisonSentences
) {
    const sentences = [sourceSentence, ...comparisonSentences];

    const response = await fetch(
        "http://localhost:5002/api/sentenceSimilarityLocal",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sentences: sentences }),
        }
    );

    const data = await response.json();
    return data.similarityArray;
}
