import "../styles/styles.css";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <div className="container">
      <div className="Include-Header">
        <Header />
      </div>
      <div className="container-children">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DefaultLayout;
