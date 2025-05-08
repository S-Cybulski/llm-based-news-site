import NewsAPI from "newsapi";
import dotenv from "dotenv";

dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

export const getNewsArticles = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            language: "en",
            pageSize: 100,
            sources:
                "bbc-news, independent, bbc-sport, cbc-news, the-guardian-uk, the-new-york-times, al-jazeera-english, msn-news , sky-news"
        });

        return response.articles;
    } catch (error) {
        console.error(`Error in fetching articles: ${error.message}`);
        process.exit(1);
    }
};
