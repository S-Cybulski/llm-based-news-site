import Navbar from "../components/NavbarRedo";
import "../App.css";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";

const TestPage = () => {
    const [category, setCategory] = useState("general");
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log("Category changed:", category);
    }, [category]);

    return (
        <div className="page-container">
            <Navbar setCategory={setCategory} articles={articles}></Navbar>
            <Feed category={category} setArticles={setArticles}></Feed>
        </div>
    );
};

export default TestPage;
