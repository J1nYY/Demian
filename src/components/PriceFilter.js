function PriceFilter({ onFilter }) {
    const handleChange = (min, max) => {
        onFilter({ min, max });
    };

    return (
        <div className="price-filter">
            <label><input type="radio" name="price" onChange={() => handleChange(0, Infinity)} defaultChecked /> 전체</label>
            <label><input type="radio" name="price" onChange={() => handleChange(0, 30000)} /> ~3만원</label>
            <label><input type="radio" name="price" onChange={() => handleChange(30000, 50000)} /> 3~5만원</label>
            <label><input type="radio" name="price" onChange={() => handleChange(50000, Infinity)} /> 5만원~</label>
        </div>
    );
}
export default PriceFilter;