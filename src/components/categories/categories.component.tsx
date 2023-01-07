import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../redux/categories-reducer.redux";

import "./categories.component.styles.scss";

const Categories = () => {
  const categories = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const toCategoryRoute =()=>{

  }

  return (
    <div className="category-box">
      <div className="category-box-h2">
        <h2>Categories</h2>
      </div>

      <div className="categories">
        {categories.slice(0, 5).map((category) => (
          <div key={category.id} className="categories-category" onClick={toCategoryRoute}>
            <img src={category.image} />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
