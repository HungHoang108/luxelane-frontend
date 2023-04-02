import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { searchTagAction } from "../redux/searchTagReducer";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { darkMode } from "../redux/darkModeReducer";
import UserPopUp from "./UserPopUp";

const Navigation = () => {
  const [status, setStatus] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.CartReducer);
  const currentDarkMode = useAppSelector((state) => state.DarkModeReducer);

  let access_token = localStorage.getItem("userToken");
  let userProfile = localStorage.getItem("userProfile");
  let profile = userProfile && JSON.parse(userProfile);

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

  const setDarkMode = () => {
    dispatch(darkMode(!currentDarkMode));
  };

  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div className="navBox-nav-left">
          <div
            className="testx"
          >
            <Link className="nav-left_sub link" to="">
              Home
            </Link>
          </div>
          <div
          >
            <Link className="nav-left_sub link" to="productlist">
              Products
            </Link>
          </div>
        </div>
        <div className="nav-icon">
          <div className="nav-icon_search">
            <input onKeyDown={handleKeyPress}  type="text" placeholder="search products" onChange={handleSearch} />
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
            {access_token ? (
              <div className="nav-user-profile">
                <div className="user-profile-image">
                  <img src={profile.avatar} alt="" />
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
            {access_token && (
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
