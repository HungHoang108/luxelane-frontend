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
  }, []);

  const productArray = categoryProducts.filter((item) => item.id === groupId && item);

  const [sortedProducts, setSortedProducts] = useState(productArray[0].product);


  const sortByPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "price-down") {
      const sortedArray = productArray[0].product.slice().sort((a, b) => b.price - a.price);
      setSortedProducts(sortedArray);
    } else if (value === "price-up") {
      const sortedArray = productArray[0].product.slice().sort((a, b) => a.price - b.price);
      setSortedProducts(sortedArray);
    }
    // dispatch(sortByPriceCategory(e.target.value));
  };
  // useEffect(() => {
  //   if (productArray.length !== 0) {
  //     setSortedProducts(productArray[0].product);
  //   }
  // }, [productArray]);
  return (
    <div className="productList-box">
      <div className="productList-box-head">
        <div>{productArray && <h2>{productArray && productArray[0].name}</h2>}</div>
        <div className="productList-box-head_sort">
          <span>Sort by price</span>
          <select onChange={sortByPrice} id="sort">
            <option>Sort products</option>
            <option value="price-down">From highest price</option>
            <option value="price-up">From lowest price</option>
          </select>
        </div>
      </div>
      {productArray[0] && <ProductCard productList={sortedProducts} />}
    </div>
  );
};

export default CategoryPage;
