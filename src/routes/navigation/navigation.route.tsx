import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cart from "../../components/cart-dropdown/cart-dropdown.component";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { searchTagAction } from "../../redux/search-tag-reducer";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { darkMode } from "../../redux/dark-mode.reducer";

import "./nav.component.style.scss";

const Navigation = () => {
  const [status, setStatus] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [navStyle, setNavStyle] = useState<string | null>(null);
  const navHome = () => {
    setNavStyle("home");
  };
  const navProject = () => {
    setNavStyle("products");
  };

  const nav = useNavigate();
  const loginStatus = localStorage.getItem("userToken");
  const dispatch = useAppDispatch();
  const darkModeStatus = useAppSelector((state) => state.DarkModeReducer);
  const cartItem = useAppSelector((state) => state.CartItemReducer);

  let counter = 0;
  cartItem.map((item) => (counter += item.amount));

  const cartStatus = () => {
    setStatus(!status);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTag(e.target.value);
  };

  const searchForProduct = () => {
    dispatch(searchTagAction(searchTag));
    localStorage.setItem("searchQuery", searchTag);
    nav("/searchresult");
  };

  const removeUserData = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("role");
  };
  const testa = () => {
    dispatch(darkMode(!darkModeStatus));
  };

  return (
    <div className="navBox">
      <div className="navBox-nav">
        <div className="navBox-nav-left">
          <div
            onClick={navHome}
            style={{
              borderBottom:
                navStyle === "home" || navStyle === null
                  ? "2px solid black"
                  : "",
            }}
          >
            <Link className="navBox-nav_home link" to="">
              Home
            </Link>
          </div>
          <div
            onClick={navProject}
            style={{
              borderBottom: navStyle === "products" ? "2px solid black" : "",
            }}
          >
            <Link className="link" to="productlist">
              Products
            </Link>
          </div>
        </div>
        <div className="nav-icon">
          <div className="nav-icon_search">
            <input type="text" placeholder="search" onChange={handleSearch} />
            <button onClick={searchForProduct}>
              <SearchOutlinedIcon fontSize="inherit" />
            </button>
          </div>

          <div onClick={testa}>
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
    </div>
  );
};

export default Navigation;
