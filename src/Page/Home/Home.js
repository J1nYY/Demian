import Button from "../../components/Button";
import ProductList from "../../components/ProductList";
function Home({selectedProduct,setselectedProduct}) {
  return (
    <div>
      <Button />
      <ProductList selectedProduct={selectedProduct}
        setselectedProduct={setselectedProduct}></ProductList>
    </div>
  );
}

export default Home;
