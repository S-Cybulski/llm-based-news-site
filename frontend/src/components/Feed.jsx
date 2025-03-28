import { newsFeed } from "../../feed/Articles";
import "./Feed.css";
import { useEffect } from 'react';

const Feed = () => {

    const {fetchArticles, articles} = newsFeed();
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);
    console.log("articles", articles);

    return (
        <div className="feed-container">
                {articles.map((article, index) => (
                <ArticleCard key={article._id} article={article} 
                className={index % 2 === 0 ? "dark-card" : "light-card"}
                />
            ))}
        </div>
    );
}

const ArticleCard = ({article, className}) => {
    return (
        <div className={`article-card ${className}`}>
            <img src={article.urlToImage} width={100}></img>
            <h1>{article.title}</h1>
        </div>
    );
}

export default Feed;