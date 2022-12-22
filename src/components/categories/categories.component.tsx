import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../redux/categories-reducer.redux";

const Categories = () => {
  const categories = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
console.log(categories)
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  return <div>Categories----------</div>;
};

export default Categories;
