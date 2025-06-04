import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Button() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            navigate(`/Search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className="search-title">
            <input
                className="Search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
            />
            <button className="Button" type="button" onClick={handleSearchSubmit}>
                Enter
            </button>
        </div>
    );
}

export default Button;
