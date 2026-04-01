import React from "react";

export default function SortOptions({ onSort }) {
    return (
        <div className="sort-options">
            <select onChange={(e) => onSort(e.target.value)}>
                <option value="price-asc">가격 오름차순</option>
                <option value="price-desc">가격 내림차순</option>
                <option value="title-asc">이름 오름차순</option>
                <option value="title-desc">이름 내림차순</option>
            </select>
        </div>
    );
}