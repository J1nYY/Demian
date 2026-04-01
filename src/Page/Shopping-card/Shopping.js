import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import images from "../../asset/image";
import "./Shopping.css";

function Shopping() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  return (
    <>
      <Link to="/home" className="Link-css">
        <h1>데미안</h1>
      </Link>
      <h2>&lt; 장바구니</h2>
      <div className="shopping-container">
        {cart.length === 0 ? (
          <h1 className="Product-empty">장바구니가 비어있습니다.</h1>
        ) : (
          cart.map((product) => (
            <div className="Product" key={product.id}>
              <img
                src={product.image_url || images.noImage}
                className="Product-img"
                alt={product.title}
              />
              <div className="Product-info">
                <p className="Product-name">{product.title}</p>
                <p className="Product-price">
                  {Number(product.price) * product.quantity}
                </p>
                <button
                  type="button"
                  className="Product-button"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="Product-input"
                  value={product.quantity}
                />
                <button
                  type="button"
                  className="Product-button"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="Product-button Product-button-delete"
                  onClick={() => removeFromCart(product.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Shopping;
