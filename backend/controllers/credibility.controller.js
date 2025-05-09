import { getNewsArticles } from "../config/newsAPI.js";
import {
    getSentenceSimilarity,
    sentimentAnalysisLocal,
} from "../config/huggingFaceAPI.js";
import { getContent } from "../config/webScraper.js";
import { compareArticles } from "../config/huggingFaceAPI.js";
import { cat } from "@xenova/transformers";

const splitIntoChunks = (arr, batchSize) => {
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
    const batches = splitIntoChunks(titles, batchSize);

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

export const compareArticle = async (article1Url, article2Url) => {
    const article1 = await getContent(article1Url);
    const article2 = await getContent(article2Url);

    const similarityScore = await compareArticles(article1, article2);

    return similarityScore;
};

export const getSentiment = async (url, title) => {
    const article = await getContent(url);
    const sentiment = sentimentAnalysisLocal(article, title);
    return sentiment;
};


const compared = await compareArticle("https://www.bbc.co.uk/news/articles/ce848g8l8vro", "https://www.theguardian.com/business/2025/may/07/danish-firm-shelves-huge-uk-windfarm-project-over-rising-costs");

console.log("Compared:", compared);

// const similarityScores = await findSimilarArticles("Danielle Smith's U.S. media remarks stoke reaction as party leaders hi…");

// console.log("Scores:", similarityScores);
// const article1Title = "Blow to clean energy drive as major windfarm ditched";
// const article1 = await getSentiment(
//     "https://www.bbc.co.uk/news/articles/ce848g8l8vro", article1Title
// );
// console.log("Sentiment:", article1.category);
// console.log("News type:", article1.fake_news)
