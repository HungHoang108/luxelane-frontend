import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Root from "./components/root/Root";
import NotFound from "./components/not-found/NotFound";
import ProductList from "./pages/product-list/ProductList";
import CartPage from "./pages/cart-page/CartPage";
import Login from "./pages/login-logout/Login";
import SearchResult from "./pages/searchResult/SearchResult";
import NewProduct from "./pages/new-product/NewProduct";
import CategoryRoute from "./pages/category/CategoryRoute";
import { useAppSelector } from "./hooks/reduxHook";
import ProductRoute from "./pages/product/ProductRoute";

import "./app.style.scss"

const App = () => {
  const currentDarkMode = useAppSelector((state) => state.DarkModeReducer);
  const [test, settest] = useState(currentDarkMode);
  // style={{ backgroundColor: "black", color: "white" }}
  return (
    <div className={currentDarkMode ? "dark" : "light"}>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/category" element={<CategoryRoute />} />
          <Route path="/singleItemRoute" element={<ProductRoute />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
