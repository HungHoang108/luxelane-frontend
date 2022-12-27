import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../../cart/cart.component";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import { isLogIn } from "../../../redux/loginStatus-reducer";

import "./nav.component.style.scss";

const Navigation = () => {
  const [status, setStatus] = useState(false);
  const loginStatus = useAppSelector((state) => state.LoginReducer);
  const dispatch = useAppDispatch();
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
          <div className="navBox-cart">
            <Cart />
          </div>

          <div>
            {loginStatus ? (
              <Link onClick={() => dispatch(isLogIn(false))} to="">
                LOG OUT
              </Link>
            ) : (
              <Link to="login">LOG IN</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
