import { ChangeEvent, useState, useEffect } from "react";
import ProductCard from "../../product-card/product-card.component";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { sortByPrice } from "../../../redux/products-reducer";
import { useAppSelector } from "../../../hooks/reduxHook";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer);

  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(sortByPrice(sortOption));
  }, [sortOption]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortOption(e.target.value);
  };

  return (
    <div>
      <div>
        <select onChange={handleChange} id="sort">
          <option>Sort products</option>

          <optgroup label="Category">
            <option value="Furniture">Furniture</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Shoes">Shoes</option>
            <option value="Others">Others</option>
          </optgroup>
          <option value="price-down">From highest price</option>
          <option value="price-up">From lowest price</option>
        </select>
      </div>
      <ProductCard title="All Products" productsDisplayed={8} />
    </div>
  );
};

export default ProductList;
