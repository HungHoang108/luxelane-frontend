import { ChangeEvent, useState } from "react";
import ProductCard from "../../product-card/product-card.component";

const ProductList = () => {
  const [sortOption, setSortOption] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  return (
    <div>
      <div>
        <select onChange={handleChange} id="sort">
          <option>Sort products</option>
          <option value="category">Category</option>
          <option value="price-down">From highest price</option>
          <option value="price-up">From lowest price</option>
        </select>
      </div>
      <ProductCard title="All Products" productsDisplayed={8} />
    </div>
  );
};

export default ProductList;
