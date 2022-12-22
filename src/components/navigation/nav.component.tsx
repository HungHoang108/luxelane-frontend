import React from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/cart.component";

import "./nav.component.style.scss";

const Navigation = () => {
  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div>
          <Link to="">Home</Link>
          <Link to="productlist">Products</Link>
          <Link to="about">About</Link>
        </div>
        <div className="nav-icon">
          <div>search</div>
          <div>light</div>
          <div>cart</div>
          <div>login</div>
        </div>
      </div>
      <div className="navBox-cart">
        <Cart />
      </div>
    </div>
  );
};

export default Navigation;
