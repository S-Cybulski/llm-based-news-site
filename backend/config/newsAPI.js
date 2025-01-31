import NewsAPI from "newsapi"
import dotenv from "dotenv";

dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

export const getNewsArticles = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            language: 'en',
            pageSize: 9
        });
        return response.articles;
        //console.log(response.articles[0]);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

