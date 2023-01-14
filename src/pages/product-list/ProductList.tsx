import { ChangeEvent } from "react";

import ProductCard from "../../components/product-card/ProductCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { sortByCategory } from "../../redux/sortCategoryReducer";
import { sortByPrice } from "../../redux/productReducer";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productReducer);
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
          <div>
            <span>Sort by category</span>
            <select onChange={handleCategory}>
              <option value="">All</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Shoes">Shoes</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <span>Sort by price</span>
            <select onChange={handleChange} id="sort">
              <option>Sort products</option>
              <option value="price-down">From highest price</option>
              <option value="price-up">From lowest price</option>
            </select>
          </div>
        </div>
      </div>

      <ProductCard
        title="All Products"
        productsDisplayed={8}
        productList={products}
      />
    </div>
  );
};

export default ProductList;
