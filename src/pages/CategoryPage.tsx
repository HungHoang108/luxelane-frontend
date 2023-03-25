import { ChangeEvent, useEffect } from "react";
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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortByPriceCategory(e.target.value));
  };

  return (
    <div className="productList-box">
      <div className="productList-box-head">
        <div>{productArray[0] && <h2>{productArray[0] && productArray[0].name}</h2>}</div>
        <div className="productList-box-head_sort">
          <span>Sort by price</span>
          <select onChange={handleChange} id="sort">
            <option>Sort products</option>
            <option value="price-down">From highest price</option>
            <option value="price-up">From lowest price</option>
          </select>
        </div>
      </div>
      {productArray[0] && <ProductCard productsDisplayed={7} productList={productArray[0].product} params="" />}
    </div>
  );
};

export default CategoryPage;
