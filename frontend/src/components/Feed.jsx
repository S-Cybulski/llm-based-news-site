import { newsFeed } from "../../feed/Articles";
import "./Feed.css";
import { useEffect, useState } from "react";
import { articleSummary } from "../../feed/Articles";

const Feed = () => {
    const { fetchArticles, articles } = newsFeed();
    const { fetchSummary } = articleSummary();
    const [summary, setSummary] = useState("");
    const [showSummary, setShowSummary] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchArticles();
            setLoading(false);
        };
        fetchData();
    }, [fetchArticles]);

    useEffect(() => {
        console.log("Summary updated:", summary);
    }, [summary]);  // This will run every time summary changes
    

    const onClose = () => {
        console.log("Closing summary");
        setShowSummary(false);
        setSummary("");
    };

    return (
        <div className="feed-container">
            {articles.map((article, index) => (
                <ArticleCard
                    key={article._id}
                    article={article}
                    className={index % 2 === 0 ? "dark-card" : "light-card"}
                    index={index}
                    fetchSummary={fetchSummary}
                    setShowSummary={setShowSummary}
                    setSummary={setSummary}
                />
            ))}
            {showSummary && console.log("State:", summary)}
            {showSummary && <SummaryCard summary={summary} onClose={onClose} />}
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
}) => {
    const handleClick = async () => {
        const summarisedData = await fetchSummary(article.url);
        console.log("Fetched summary:", summarisedData.summary);
        setSummary(summarisedData);
        setShowSummary(true);
    };
    return (
        <div className={`article-card ${className}`} onClick={handleClick}>
            <div>{index + 1}</div>
            <img src={article.urlToImage} width={100}></img>
            <h1>{article.title}</h1>
        </div>
    );
};

const SummaryCard = ({ summary, onClose }) => {
    return (
        <div className="summary-container">
            <span className="close" onClick={onClose}>&times;</span>
            <h1>Summary</h1>
            <p>{summary}</p>
        </div>
    );
};

export default Feed;
