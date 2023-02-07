import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cart from "../cart-dropdown/Cart";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { searchTagAction } from "../../redux/searchTagReducer";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { darkMode } from "../../redux/darkModeReducer";
import UserPopUp from "../user-logout/UserPopUp";

const Navigation = () => {
  const [status, setStatus] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [navStyle, setNavStyle] = useState<string | null>(null);

  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  const test = useAppSelector((state) => state.userSessionReducer);
  const currentDarkMode = useAppSelector((state) => state.DarkModeReducer);

  let userData = localStorage.getItem("userInfo");
  let parseUserData = userData && JSON.parse(userData);

  const navHome = () => {
    setNavStyle("home");
  };
  const navProject = () => {
    setNavStyle("products");
  };

  let counter = 0;
  cartItem.map((item) => counter++);

  const cartStatus = () => {
    setStatus(!status);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      searchForProduct();
    }
  };

  const searchForProduct = () => {
    dispatch(searchTagAction(searchTag));
    nav("/searchresult");
  };

  const searchStatus = () => {
    dispatch(searchTagAction(searchTag));
    nav("/searchresult");
  };

  const setDarkMode = () => {
    dispatch(darkMode(!currentDarkMode));
  };

  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div className="navBox-nav-left">
          <div
            onClick={navHome}
            // style={{
            //   borderBottom:
            //     navStyle === "home" || navStyle === null
            //       ? "2px solid white"
            //       : "",
            // }}
            className="testx"
          >
            <Link className="nav-left_sub link" to="">
              Home
            </Link>
          </div>
          <div
            onClick={navProject}
            // style={{
            //   borderBottom: navStyle === "products" ? "2px solid white" : "",
            // }}
          >
            <Link className="nav-left_sub link" to="productlist">
              Products
            </Link>
          </div>
        </div>
        <div className="nav-icon">
          <div className="nav-icon_search">
            <input
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="search products"
              onChange={handleSearch}
            />
          </div>
          <div className="nav-icon_dark-mode" onClick={setDarkMode}>
            <LightModeSharpIcon fontSize="small" />
          </div>
          <div>
            <div onClick={cartStatus} className="nav-icon_cart">
              <ShoppingCartOutlinedIcon fontSize="small" />
              <span>{counter}</span>
            </div>
            <div className="navBox-cart">
              <Cart />
            </div>
          </div>
          <div className="nav-icon_user-profile">
            {userData ? (
              <div className="nav-user-profile">
                <div className="user-profile-image">
                  <img src={parseUserData.avatar} alt="" />
                </div>
                <div className="user-profile-popup">
                  <UserPopUp />
                </div>
              </div>
            ) : (
              <Link className="link btn" to="login">
                Log in
              </Link>
            )}
          </div>
          <div>
            {userData && (
              <Link className="link btn" to="newproduct">
                New Product
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
