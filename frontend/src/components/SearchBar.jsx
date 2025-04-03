import { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ articles }) => {
    const [value, setValue] = useState("");
    const [hideSuggestions, setHideSuggestions] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        // Filter articles based on the search value
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredArticles(filtered);
    }, [value, articles]);

    return (
        <div className="search-bar">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#1f1f1f"
            >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {!hideSuggestions && value && (
                <div className="suggestions">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <div
                                key={article._id}
                                className="suggestion-item"
                                onClick={() => {
                                    setValue(article.title); // Set the clicked suggestion as the input value
                                    setHideSuggestions(true); // Hide suggestions
                                }}
                            >
                                {article.title}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
