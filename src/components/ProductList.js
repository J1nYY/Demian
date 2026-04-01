import React, { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
const ITEMS_PER_PAGE = 4;
function ProductList_withbutton() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  //일단 있는 api로 만들게요
  useEffect(() => {
    fetch("http://127.0.0.1:8000/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched books:", data.books);
        setBooks(data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  //여기부터
  const [currentPage, setCurrentPage] = useState(0);
  const maxPage = Math.ceil(books.length / ITEMS_PER_PAGE) - 1;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + maxPage + 1) % (maxPage + 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 + maxPage + 1) % (maxPage + 1));
  };

  const visibleProducts = books.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="carousel-wrapper">
      <ul className="products">
        <button className="left-button" onClick={handlePrev}>
          <FaCaretLeft className="icon-button-left" />
        </button>
        {visibleProducts.map((book) => (
          <li className="product" key={book.id}>
            <a
              className="productCard"
              href={`/product-detail/?id=${book.id}`}
              target="_blank"
            >
              <div className="thumbnail-wrap">
                <img
                  className="thumbnail"
                  src={book.image_url}
                  alt={book.title}
                />
              </div>
              <p className="product-name">{book.title}</p>
              <p className="product-price">
                {book.price} <span className="discount">20%</span>
              </p>
            </a>
          </li>
        ))}
        <button className="right-button" onClick={handleNext}>
          <FaCaretRight className="icon-button-right" />
        </button>
      </ul>
    </div>
  );
}

export default ProductList_withbutton;
