import { ChangeEvent, useState, useEffect } from "react";
import ProductCard from "../../product-card/product-card.component";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { sortByPrice } from "../../../redux/products-reducer";

const ProductList = () => {
  const dispatch = useAppDispatch();

  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    dispatch(sortByPrice(sortOption));
  }, [sortOption]);
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
