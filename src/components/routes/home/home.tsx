import React from "react";
import Bestseller from "../../bestseller/bestseller.component";
import Categories from "../../categories/categories.component";
import "./home.component.styles.scss"

const Home = () => {
  return (
    <div className="home">
      <Categories />
      <Bestseller />
    </div>
  );
};

export default Home;
