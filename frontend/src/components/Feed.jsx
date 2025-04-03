import { newsFeed } from "../../feed/Articles";
import "./Feed.css";
import { useEffect, useState } from "react";
import { articleSummary } from "../../feed/Articles";

const Feed = ({ category, setArticles }) => {
    const { fetchArticles, articles } = newsFeed();
    const { fetchSummary } = articleSummary();
    const [summary, setSummary] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentArticle, setCurrentArticle] = useState({
        title: "",
        url: "",
        urlToImage: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchArticles();
            setLoading(false);
        };
        fetchData();
    }, [fetchArticles]);

    useEffect(() => {
        console.log("Summary updated:", summary);
    }, [summary]);

    useEffect(() => {
        const sortedArticles = [...articles].sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setArticles(sortedArticles);
    }, [articles, setArticles]);

    const onClose = () => {
        console.log("Closing summary");
        setShowSummary(false);
        setSummary("");
        setCurrentArticle({
            title: "",
            url: "",
            urlToImage: "",
        });
    };

    return (
        <div className="feed-container">
            {articles
                .filter(
                    (article) =>
                        category === "general" || article.category === category
                )
                .map((article, index) => (
                    <ArticleCard
                        key={article._id}
                        article={article}
                        className={index % 2 === 0 ? "dark-card" : "light-card"}
                        index={index}
                        fetchSummary={fetchSummary}
                        setShowSummary={setShowSummary}
                        setSummary={setSummary}
                        loading={loading}
                        setLoading={setLoading}
                        setCurrentArticle={setCurrentArticle}
                    />
                ))}
            {loading && <Loading />}
            {showSummary && console.log("State:", summary)}
            {showSummary && (
                <SummaryCard
                    summary={summary}
                    onClose={onClose}
                    currentArticle={currentArticle}
                />
            )}
        </div>
    );
};

const ArticleCard = ({
    article,
    className,
    index,
    fetchSummary,
    setShowSummary,
    setSummary,
    loading,
    setLoading,
    setCurrentArticle,
}) => {
    const handleClick = async () => {
        if (!loading) {
            setLoading(true);
            const summarisedData = await fetchSummary(article.url);
            console.log("Fetched summary:", summarisedData.summary);
            setSummary(summarisedData);
            setCurrentArticle({
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
            });
            setShowSummary(true);
            setLoading(false);
        }
    };
    return (
        <div className={`article-card ${className}`} onClick={handleClick}>
            <div>{index + 1}</div>
            <img src={article.urlToImage} width={100}></img>
            <h1>{article.title}</h1>
        </div>
    );
};

const SummaryCard = ({ summary, onClose, currentArticle }) => {
    return (
        <div className="backdrop">
            <div className="summary-container">
                <img src={currentArticle.urlToImage} width={400}></img>
                <h1 className="title">{currentArticle.title}</h1>
                <p className="summary">{summary}</p>
                <a href={currentArticle.url}>Read the full article</a>
                <span className="close" onClick={onClose}>
                    &times;
                </span>
            </div>
        </div>
    );
};

const Loading = () => {
    return (
        <div className="backdrop">
            <div className="summary-container">
                <h2>Loading...</h2>
            </div>
        </div>
    );
};

export default Feed;
