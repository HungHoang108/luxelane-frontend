import { ChangeEvent } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { useAppDispatch } from "../../hooks/reduxHook";
import { sortByCategory } from "../../redux/sort-category-reducer";
import { sortByPrice } from "../../redux/products-reducer";

import "./product-list.style.scss";

const CategoryRoute = () => {
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByPrice(e.target.value));
  };
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByCategory(e.target.value));
  };
  return (
    <div className="productList-box">
      <div className="productList-box-head">
        <div>
          <h2>All Products</h2>
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

      <ProductCard title="All Products" productsDisplayed={9} />
    </div>
  );
};

export default CategoryRoute;
