import "../styles/styles.css";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function DefaultLayout({ children,isLoggedIn,setIsLoggedIn }) {
  return (
    <div className="container">
      <div className="Include-Header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
      <div className="container-children">{children}</div>
      <div>
        <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
    </div>
  );
}

export default DefaultLayout;
