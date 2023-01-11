import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../redux/categoriesReducer";
import { fetchAllProductsInCategory } from "../../redux/categoriesReducer";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const nav = useNavigate();
  const categories = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className="category-box">
      <div className="category-box-h2">
        <h2>Categories</h2>
      </div>

      <div className="categories">
        {categories.slice(0, 5).map((category) => (
          <div
            key={category.id}
            className="categories-category"
            onClick={() => {
              dispatch(fetchAllProductsInCategory(category.id));
              nav("/category");
            }}
          >
            <img src={category.image} alt="" />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
