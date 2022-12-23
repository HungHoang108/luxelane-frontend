import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../../cart/cart.component";

import "./nav.component.style.scss";

const Navigation = () => {
  const [status, setStatus] = useState(false);

  const cartStatus = () => {
    setStatus(!status);
  };
  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div>
          <Link to="">Home</Link>
          <Link to="productlist">Products</Link>
        </div>
        <div className="nav-icon">
          <div>search</div>
          <div>light</div>
          <div onClick={cartStatus} className="nav-icon_cart">
            cart
          </div>
          <div>
            <Link to="login">LOG IN</Link>
          </div>
        </div>
      </div>
      <div className="navBox-cart">{status && <Cart />}</div>
    </div>
  );
};

export default Navigation;
