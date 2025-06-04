
function ProductGrid({ products }) {
    return (
        <div className="grid">
            {products.map((product, index) => (
                <div key={product.id || index} className="category-product-info">
                    <a className="productCard"
                       href={`/product-detail/?id=${product.id}`}
                       target="_blank">
                        <img
                            className="category-product-image"
                            src={product.image || "/images/noImage.png"}
                            alt={product.title}
                        />
                        <div className="category-product-name">{product.title}</div>
                        <div className="category-product-price">{product.price}</div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default  ProductGrid;