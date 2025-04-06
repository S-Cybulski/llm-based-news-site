import "./Navbar.css";
import SearchBar from "./SearchBar";

const Navbar = ({
    setCategory,
    articles,
    fetchSummary,
    setShowSummary,
    setSummary,
    setCurrentArticle,
    setLoading,
}) => {
    return (
        <div className="navbar-container">
            <div className="top-navbar">
                <div className="top-navbar-container">
                    <div
                        className="logo"
                        onClick={() => setCategory("general")}
                    >
                        The News
                    </div>
                    <div className="search-bar-container">
                        <SearchBar
                            articles={articles}
                            fetchSummary={fetchSummary}
                            setShowSummary={setShowSummary}
                            setSummary={setSummary}
                            setCurrentArticle={setCurrentArticle}
                            setLoading={setLoading}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="50px"
                            viewBox="0 -960 960 960"
                            width="50px"
                            fill="#1f1f1f"
                        >
                            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="bottom-navbar">
                <div className="category-container">
                    <div
                        className="category"
                        onClick={() => setCategory("business")}
                    >
                        Business
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("health")}
                    >
                        Health
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("entertainment")}
                    >
                        Entertainment
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("politics")}
                    >
                        Politics
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("science")}
                    >
                        Science
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("sports")}
                    >
                        Sports
                    </div>
                    <div
                        className="category"
                        onClick={() => setCategory("technology")}
                    >
                        Technology
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
