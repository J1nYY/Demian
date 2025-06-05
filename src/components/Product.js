import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Product.css";
import Button from "./Button.js";

function Product({setselectedProduct}) {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  const id = searchParams.get("id");
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:8001/search/products?id=${id}`, {
        credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    setselectedProduct(true);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
        <Button />
      <div className="Product-title-container">
        <div className="Product-title">
          <div className="product-info-left">
            <img
              className="product-image"
              src={book.image_url}
              alt={book.title}
            />
          </div>
          <div className="product-info-right">
            <h3>{book.title}</h3>
            <h2 className="product-price2">{book.price}</h2>
            <button
              type="button"
              className="info-button"
              onClick={async () => {
                  try {
                      const message = await addToCart(book.id);
                      setMessage(message);
                  } catch (err) {
                      setMessage(err.message);
                  } finally {
                      setTimeout(() => setMessage(""), 1000);
                  }
              }}
            >
              장바구니 담기
            </button>

              <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-button"
                  style={{ textAlign: "center", textDecoration: "none", marginTop: "10px" }}
              >
                  상품 페이지 이동
              </a>
            {message && <div className="notification-message">{message}</div>}
          </div>
        </div>
      </div>
      <h1 className="product-description">제품에 대한 상세 설명</h1>
        <div className="product-text-detail-container">
            {book.text_description
                ?.split('\n')
                .map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
      <div className="product-image-detail-container">
          {book.image_description?.slice(0, 5).map((url, index) => (
              <img
                  key={index}
                  className="product-image-detail"
                  src={url}
                  alt={`${book.title} 이미지 ${index + 1}`}
              />
          ))}
      </div>
    </>
  );
}

export default Product;
