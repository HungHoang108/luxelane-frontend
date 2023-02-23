import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Root from "./components/Root";
import NotFound from "./components/NotFound";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import NewProduct from "./pages/NewProduct";
import CategoryRoute from "./pages/CategoryRoute";
import { useAppSelector } from "./hooks/reduxHook";
import ProductRoute from "./pages/ProductRoute";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const currentDarkMode = useAppSelector((state) => state.DarkModeReducer);

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
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
