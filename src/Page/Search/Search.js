import React, { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid_Search";
import PriceFilter from "../../components/PriceFilter";
import SortOptions from "../../components/SortOptions";
import "./Search.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";

function Search() {
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setKeyword(params.get("q") || "");
    }, [location.search]);
    useEffect(() => {
        const fetchProducts = async () => {
            if (!keyword) return;

            try {
                const response = await fetch(`http://127.0.0.1:8001/search?keyword=${encodeURIComponent(keyword)}`);
                const data = await response.json();

                if (data.results) {
                    const converted = data.results;
                    setProducts(converted);
                    setFilteredProducts(converted);
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error("검색 API 오류:", error);
            }
        };

        fetchProducts();
    }, [keyword]);

    useEffect(() => {
        let result = [...products];

        // 가격 필터
        result = result.filter(p => {
            const numericPrice = parseInt((p.price || "").toString().replace(/[^\d]/g, ""), 10) || 0;
            return numericPrice >= priceFilter.min && numericPrice <= priceFilter.max;
        });

        // 정렬 옵션
        if (sortOption === "price-asc") {
            result.sort((a, b) => {
                const aPrice = parseInt((a.price || "").toString().replace(/[^\d]/g, ""), 10) || 0;
                const bPrice = parseInt((b.price || "").toString().replace(/[^\d]/g, ""), 10) || 0;
                return aPrice - bPrice;
            });
        } else if (sortOption === "price-desc") {
            result.sort((a, b) => {
                const aPrice = parseInt((a.price || "").toString().replace(/[^\d]/g, ""), 10) || 0;
                const bPrice = parseInt((b.price || "").toString().replace(/[^\d]/g, ""), 10) || 0;
                return bPrice - aPrice;
            });
        } else if (sortOption === "title-asc") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "title-desc") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredProducts(result);
    }, [products, sortOption, priceFilter]);


    return (
        <>
            <Button />
        <div className="search-page">
            <div className="filter-bar">
                <PriceFilter onFilter={setPriceFilter} />
                <SortOptions onSort={setSortOption} />
            </div>
            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px" }}>검색 결과가 없습니다.</p>
            ) : (
                <ProductGrid products={filteredProducts} />
            )}
        </div>
        </>
    );
}
export default Search;