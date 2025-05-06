import { getNewsArticles } from "../config/newsAPI.js";
import { getSentenceSimilarity } from "../config/huggingFaceAPI.js";

export const assessCredibility = async (title) => {
    const articles = await getNewsArticles();
    const titles = articles.map((article) => article.title);

    console.log("title", [title, ...titles]);

    const similarityScores = await getSentenceSimilarity(title, titles);
    console.log(similarityScores);
    return similarityScores;

}

const similarityScores = assessCredibility("Trumps tarriff on China is a disaster for the US economy");

console.log("Scores:" + similarityScores);