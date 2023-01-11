import { ChangeEvent, useEffect } from "react";

import ProductCard from "../../components/product-card/ProductCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { sortByPrice } from "../../redux/productReducer";

const CategoryRoute = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.categoryReducer);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByPrice(e.target.value));
  };
  let counter = 0;
  useEffect(() => {
    console.log(counter);
    counter++;
  });

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
      <ProductCard
        title="All Products"
        productsDisplayed={7}
        productList={products}
      />
    </div>
  );
};

export default CategoryRoute;
