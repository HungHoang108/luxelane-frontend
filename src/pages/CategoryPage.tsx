import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { sortByPriceCategory } from "../redux/categoryReducer";
import { fetchAllCategories } from "../redux/categoryReducer";

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const categoryProducts = useAppSelector((state) => state.categoriesReducer);
  const { categoryId } = useParams<string>();
  const groupId = Number(categoryId);

  // dispatch the action to load the initial state in case the component is being reloaded
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const productArray = categoryProducts.filter((item) => item.id === groupId && item);

  const [sortedProducts, setSortedProducts] = useState(productArray.length && productArray[0].product);

  useEffect(() => {
    if (productArray.length > 0) {
      setSortedProducts(productArray[0].product);
    }
  }, [productArray]);
  const sortByPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "price-down") {
      const sortedArray =sortedProducts && sortedProducts.slice().sort((a, b) => b.price - a.price);
      console.log(sortedArray)
      setSortedProducts(sortedArray);
    } else if (value === "price-up") {
      const sortedArray =sortedProducts && sortedProducts.slice().sort((a, b) => a.price - b.price);
      console.log(sortedArray)
      setSortedProducts(sortedArray);
    }
  };
  return (
    <div className="productList-box">
      <div className="productList-box-head">
        <div>
          <h2>{productArray.length && productArray[0].name}</h2>
        </div>
        <div className="productList-box-head_sort">
          {/* <span>Sort by price</span>
          <select onChange={sortByPrice} id="sort">
            <option>Sort products</option>
            <option value="price-down">From highest price</option>
            <option value="price-up">From lowest price</option>
          </select> */}
        </div>
      </div>
      {sortedProducts && <ProductCard productList={sortedProducts} />}
    </div>
  );
};

export default CategoryPage;
