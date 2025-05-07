import { getNewsArticles } from "../config/newsAPI.js";
import { getSentenceSimilarity } from "../config/huggingFaceAPI.js";

const splitIntoBatches = (arr, batchSize) => {
    const batches = [];
    for (let i = 0; i < arr.length; i += batchSize) {
        batches.push(arr.slice(i, i + batchSize));
    }
    return batches;
};

export const findSimilarArticles = async (title) => {
    const articles = await getNewsArticles();
    const titles = articles.map((article) => article.title);

    const batchSize = 32;
    const batches = splitIntoBatches(titles, batchSize);

    let similarityResults = [];

    for (const batch of batches) {
        const similarityDict = await getSentenceSimilarity(title, batch);
        
        const filtered = Object.entries(similarityDict)
            .filter(([_, score]) => score > 0.2)
            .map(([title, score]) => ({ title, score }));

        similarityResults = [...similarityResults, ...filtered];
    }

    similarityResults.sort((a, b) => b.score - a.score);

    console.log("Filtered and Sorted Similar Articles:", similarityResults);
    return similarityResults;
};

export const compareArticles = async () => {
    
}

const similarityScores = await findSimilarArticles("Danielle Smith's U.S. media remarks stoke reaction as party leaders hi…");

console.log("Scores:", similarityScores);