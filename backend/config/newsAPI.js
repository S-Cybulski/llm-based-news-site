import NewsAPI from "newsapi";
import dotenv from "dotenv";

dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

export const getNewsArticles = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            language: "en",
            pageSize: 9,
            sources: "bbc-news, independent, bbc-sport, cbc-news"
        });

        return response.articles;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};