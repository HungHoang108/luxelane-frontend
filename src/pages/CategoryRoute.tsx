import { ChangeEvent } from "react";

import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { sortByPriceCategory } from "../redux/categoriesReducer";

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.categoryReducer);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByPriceCategory(e.target.value));
  };

  return (
    <div className="productList-box">
      <div className="productList-box-head">
        <div>
          <h2>{products[0].category.name}</h2>
        </div>
        <div className="productList-box-head_sort">
          <span>Sort by price</span>
          <select onChange={handleChange} id="sort">
            <option>Sort products</option>
            <option value="price-down">From highest price</option>
            <option value="price-up">From lowest price</option>
          </select>
        </div>
      </div>
      <ProductCard productsDisplayed={7} productList={products} params="" />
    </div>
  );
};

export default CategoryPage;
