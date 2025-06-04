import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useState, useEffect, useContext } from "react";
import { categories } from "../configs/ui-config/categoryData";
import { CartContext } from "../context/CartContext";
import "../styles/Header.css";

function Header({isLoggedIn,setIsLoggedIn}) {
  const [visibe, setVisible] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalItems = Array.isArray(cart) ? cart.length : 0;

  useEffect(() => {
    fetch("http://localhost:8001/auth/protected", {
      credentials: "include"
    })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setIsLoggedIn(true);
          }
        });
  }, []);

    const handleSignOut = async () => {
        try {
            const res = await fetch("http://localhost:8001/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                await res.json();
                setIsLoggedIn(false);
                navigate("/home");
                window.location.reload();
            } else {
                alert("로그아웃 실패");
            }
        } catch (err) {
            console.error("로그아웃 중 에러:", err);
            alert("에러 발생");
        }
    };

  return (
    <header className="header">
      <div className="left-side">
        <Link to="/home" className="Link-css">
          <IoHome></IoHome>
        </Link>
      </div>
      {/* Right-side */}
      <div className="right-side">
        <Tippy
          interactive
          visible={visibe}
          placement="bottom"
          onClickOutside={() => setVisible(false)}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className="menu" onClick={() => setVisible(false)}>
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={`/category/${item.name}`}
                    className="Link-css"
                  >
                    <span className="menu-item">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        >
          <div onMouseEnter={() => setVisible(true)}>
            <Link className="Link-css" onClick={() => setVisible(false)}>
              <BiSolidCategory></BiSolidCategory>
            </Link>
          </div>
        </Tippy>
        {isLoggedIn && (
          <Link to="/shopping" className="Link-css cart-icon-container">
            <MdShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        )}
        <div
          className="account-container"
          onMouseEnter={() => setShowAccountMenu(true)}
          onMouseLeave={() => setShowAccountMenu(false)}
        >
          {isLoggedIn ? (
            <span className="Link-css" style={{ cursor: "pointer" }}>
              <MdAccountCircle />
            </span>
          ) : (
            <Link to="/account" className="Link-css">
              <MdAccountCircle />
            </Link>
          )}
          {isLoggedIn && showAccountMenu && (
            <div className="account-dropdown">
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
