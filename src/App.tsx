import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/productReducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const App = () => {
  const dispatch = useAppDispatch();
  const darkModeStatus = useAppSelector((state) => state.DarkModeReducer);
  const myTheme = createTheme({
    palette: {
      mode: darkModeStatus ? "dark" : "light",
    },
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <ThemeProvider theme={myTheme}>
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
    </ThemeProvider>
  );
};

export default App;
