import Navbar from "../components/Navbar";
import "../App.css";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";
import { articleSummary } from "../../feed/Articles";
import { newsFeed } from "../../feed/Articles";

const TestPage = () => {
    const { fetchArticles, articles } = newsFeed();
    const { fetchSummary } = articleSummary();
    const [category, setCategory] = useState("general");
    const [summary, setSummary] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentArticle, setCurrentArticle] = useState({
        title: "",
        url: "",
        urlToImage: "",
    });
    const [sortedArticles, setSortedArticles] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            await fetchArticles();
            setLoading(false);
        };
        fetchData();
    }, [fetchArticles]);

    useEffect(() => {
        const sorted = [...articles].sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setSortedArticles(sorted);
    }, [articles]);

    useEffect(() => {
        console.log("Category changed:", category);
    }, [category]);

    useEffect(() => {
        console.log("Summary updated:", summary);
    }, [summary]);

    return (
        <div className="page-container">
            <Navbar
                setCategory={setCategory}
                articles={sortedArticles}
                fetchSummary={fetchSummary}
                setShowSummary={setShowSummary}
                setSummary={setSummary}
                setCurrentArticle={setCurrentArticle}
                setLoading={setLoading}
            ></Navbar>
            <Feed
                category={category}
                setCategory={setCategory}
                articles={sortedArticles}
                setShowSummary={setShowSummary}
                setSummary={setSummary}
                setCurrentArticle={setCurrentArticle}
                fetchSummary={fetchSummary}
                setLoading={setLoading}
                loading={loading}
                summary={summary}
                showSummary={showSummary}
                currentArticle={currentArticle}
            ></Feed>
        </div>
    );
};

export default TestPage;
