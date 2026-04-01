import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import images from "../../asset/image";
import "./Shopping.css";

function Shopping() {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <>
            <Link to="/home" className="Link-css">
                <h1>데미안</h1>
            </Link>
            <h2>&lt; 장바구니</h2>
            <div className="shopping-container">
                {!Array.isArray(cart) || cart.length === 0 ? (
                    <h1 className="Product-empty">장바구니가 비어있습니다.</h1>
                ) : (
                    cart.map((product) => (
                        <div className="Product" key={product.id}>
                            <img
                                src={product.image || images.noImage}
                                className="Product-img"
                                alt={product.title}
                            />
                            <div className="Product-info">
                                <p className="Product-name">{product.title}</p>
                                <p className="Product-price">{product.price}</p>
                                <button
                                    type="button"
                                    className="Product-button Product-button-delete"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    삭제
                                </button>
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="Product-button Product-button-link"
                                >
                                    상품 보러가기
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Shopping;