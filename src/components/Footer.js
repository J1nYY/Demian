import { useState, useEffect } from "react";

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  }, []);

  return (
    <div className="footer">
      <div className="footer-1">
        <h1>
          <a classname="footer-css" href="/home">
            데미안
          </a>
        </h1>
      </div>
      <div className="footer-2">
        <p>
          <a classname="footer-css" href="/home">
            Let's Shopping
          </a>
        </p>
      </div>
      <div className="footer-3">
        <p>
          <a classname="footer-css" href="/home">
            Home
          </a>
        </p>
        <p>
          <a classname="footer-css" href="/category/의류">
            Category
          </a>
        </p>
        {isLoggedIn && (
          <p>
            <a classname="footer-css" href="/shopping">
              My Shopping
            </a>
          </p>
        )}
        {!isLoggedIn && (
          <p>
            <a classname="footer-css" href="/account">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Footer;
