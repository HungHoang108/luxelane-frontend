import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/products-reducer";

import Home from "./components/routes/home/home.route";
import Root from "./components/root/root.component";
import NotFound from "./components/not-found/notfound.component";
import ProductList from "./components/routes/product-list/product-list.component";
import CartPage from "./components/routes/cart-page/cart-page.route";
import Login from "./components/routes/login-logout/login.routes";
import SearchResult from "./components/routes/searchResult/searchResult.route";
import NewProduct from "./components/routes/new-product/new-product.component";
import ProductEditingForm from "./components/routes/product-editting/product-editing-form.component";

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
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/editproduct" element={<ProductEditingForm />} />
        <Route path="/newproduct" element={<NewProduct />} />

        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
