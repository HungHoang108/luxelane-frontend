import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cart from "../../cart/cart.component";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { searchTagAction } from "../../../redux/search-tag-reducer";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./nav.component.style.scss";

const Navigation = () => {
  const [status, setStatus] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  const nav = useNavigate();
  const loginStatus = localStorage.getItem("userToken");
  const dispatch = useAppDispatch();

  const cartStatus = () => {
    setStatus(!status);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const searchForProduct = () => {
    dispatch(searchTagAction(searchTag));
    nav("/searchresult");
  };

  const removeUserData = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("role");
  };

  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div>
          <Link className="navBox-nav_home link" to="">
            Home
          </Link>
          <Link className="link" to="productlist">
            Products
          </Link>
        </div>
        <div className="nav-icon">
          <div>
            <input type="text" placeholder="search" onChange={handleSearch} />
            <button onClick={searchForProduct}>
              <SearchOutlinedIcon fontSize="inherit" />
            </button>
          </div>
          <div>
            <LightModeSharpIcon fontSize="small" />
          </div>
          <div onClick={cartStatus} className="nav-icon_cart">
            <ShoppingCartOutlinedIcon fontSize="small" />
          </div>
          <div className="navBox-cart">
            <Cart />
          </div>
          <div>
            {loginStatus ? (
              <Link className="link btn" onClick={removeUserData} to="">
                Log out
              </Link>
            ) : (
              <Link className="link btn" to="login">
                Log in
              </Link>
            )}
          </div>
          <div>
            {loginStatus && (
              <Link className="link btn" to="newproduct">
                New Product
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* <div className="navBox-img">
        <img
          src="https://burst.shopifycdn.com/photos/kitty-cat-helps-at-work.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Navigation;
