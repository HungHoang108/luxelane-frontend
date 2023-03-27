import { ChangeEvent, useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchAllProducts } from "../redux/productReducer";

const ProductList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useAppSelector((state) => state.productReducer);


  const [sortedProducts, setSortedProducts] = useState(products);

  const sortByPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "price-down") {
      const sortedArray = sortedProducts.slice().sort((a, b) => b.price - a.price);
      setSortedProducts(sortedArray);
    } else if (value === "price-up") {
      const sortedArray = sortedProducts.slice().sort((a, b) => a.price - b.price);
      setSortedProducts(sortedArray);
    }
  };
  
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryNumber = Number(e.target.value);
    if (categoryNumber === 0) {
      setSortedProducts(products);
    } else {
      const sortedProductArray = products.filter((item) => {
        if (categoryNumber === item.categoryId) {
          return item;
        }
      });
      setSortedProducts(sortedProductArray);
    }
  };
  useEffect(() => {
    if (products.length !== 0) {
      setSortedProducts(products);
    }
  }, [products]);
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
              <option value="0">All</option>
              <option value="1">Clothes</option>
              <option value="2">Electronics</option>
              <option value="3">Furniture</option>
              <option value="4">Shoes</option>
              <option value="5">Others</option>
            </select>
          </div>
          <div>
            <span>Sort by price</span>
            <select onChange={sortByPrice} id="sort">
              <option>Sort products</option>
              <option value="price-down">From highest price</option>
              <option value="price-up">From lowest price</option>
            </select>
          </div>
        </div>
      </div>
      <ProductCard productList={sortedProducts} />
    </div>
  );
};

export default ProductList;
