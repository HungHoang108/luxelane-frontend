import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { fetchCategories } from "../redux/categoryReducer";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Categories = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const categories = useAppSelector((state) => state.categoriesReducer);
  const loadingStatus = localStorage.getItem("loadingCategory");

  return (
    <div className="category-box">
      <div className="category-box-h2">
        <h2>Categories</h2>
      </div>
      {loadingStatus === "loading" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LinearProgress sx={{ width: 1 / 6 }} color="success" />
        </div>
      ) : (
        <div className="categories">
          {categories.map((category) => (
            <div
              key={category.id}
              className="categories-category"
              onClick={() => {
                nav(`/category/${category.id}/products`);
              }}
            >
              <img src={category.image} alt="" />
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
