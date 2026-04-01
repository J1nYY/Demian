//Add searchProducts function to call product search API
function Button() {
  const searchProducts = async (searchTerm) => {
    try {
      const response = await fetch(`api/search?q=${searchTerm}`);
      const data = await response.json();
      // Handle the search results here
      console.log(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  //Add handleSearch function to handle events when user enters data
  const handleSearch = (event) => {
    searchProducts(event.target.value);
  };

  return (
    <div className="search-title">
      <input
        className="Search"
        type="text"
        placeholder="Search..."
        onChange={handleSearch} //Connect the handleSearch function to the input via the onChange event
      />
      <button className="Button" type="button">
        Enter
      </button>
    </div>
  );
}

export default Button;
