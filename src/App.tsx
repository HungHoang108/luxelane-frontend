import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/products-reducer";

import Home from "./components/routes/home/home";
import Root from "./components/root/root.component";
import NotFound from "./components/not-found/notfound.component";
import ProductList from "./components/routes/product-list/product-list.component";
import CartPage from "./components/routes/cart-page/cart-page.routes";
import Login from "./components/routes/login-logout/login.routes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Routes>
      <Route path="" element={<Root />}>
        <Route path="" element={<Home />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
