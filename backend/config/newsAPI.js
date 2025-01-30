import NewsAPI from "newsapi"

const newsapi = new NewsAPI('686ccda8db764847ba36405631e2fddb');

export const getArticles = async () => {
    try {
        const response = await newsapi.v2.topHeadlines({
            language: 'en',
            pageSize: 6
        });
        return response.articles;
        //console.log(response.articles[0]);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

