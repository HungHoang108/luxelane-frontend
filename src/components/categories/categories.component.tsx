import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../redux/categories-reducer.redux";

import "./categories.component.styles.scss"

const Categories = () => {
  const categories = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  return (
    <>
    <h1>Categories</h1>
    <div className="categories">
    {categories.slice(0, 5).map(category => (
      <div className="categories-category">
        <img src= {category.image} alt="" />
        <h4>{category.name}</h4>
      </div>
    ))}
  </div>
    </>
  )
};

export default Categories;
