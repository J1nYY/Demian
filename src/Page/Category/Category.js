//get filter from url
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button.js";
import images from "../../asset/image";
import Categoryleft from "../../components/Categoryleft.js";
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import "./Category.css";
import { categories } from "../../configs/ui-config/categoryData.js";

function Category() {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter");
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    const categoryData = categories.find((item) => item.name === type);
    setCategory(categoryData);
    setCurrentIndex(0)
  }, [type]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = `http://127.0.0.1:8001/category`;
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (filter) params.append("category", filter);

        const url = `${baseUrl}?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    setCurrentIndex(0)
    fetchProducts();
  }, [type, filter]);

  const handleFilter = (filterValue) => {
    navigate(`?filter=${encodeURIComponent(filterValue)}`);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - ITEMS_PER_PAGE));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(products.length - ITEMS_PER_PAGE, prev + ITEMS_PER_PAGE)
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button />
      <div className="Category-title">
        <div className="Category-left">
          <Categoryleft data={category} onFilter={handleFilter} />
        </div>
        <div className="Category-right">
          <h2 className="category-right-title">상품 목록</h2>
          <div className="Category-product">
            <button
              className="category-left-button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <FaCaretLeft className="category-left-icon" />
            </button>
            {visibleProducts.map((product) => (
              <div key={product.id} className="category-product-info">
                <a
                  className="productCard"
                  href={`/product-detail/?id=${product.id}`}
                  target="_blank"
                >
                  <img
                    src={product.image || images.noImage}
                    className="category-product-image"
                    alt={product.title}
                  />
                  <p className="category-product-name">{product.title}</p>
                  <p className="category-product-price">
                    {product.price}
                  </p>
                </a>
              </div>
            ))}
            <button className="category-right-button" onClick={handleNext}
                    disabled={currentIndex === products.length-ITEMS_PER_PAGE}>
              <FaCaretRight className="category-right-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
