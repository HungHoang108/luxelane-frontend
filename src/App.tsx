import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/products-reducer";


import Home from "./routes/home/home.route";
import Root from "./components/root/root.component";
import NotFound from "./components/not-found/notfound.component";
import ProductList from "./routes/product-list/product-list.component";
import CartPage from "./routes/cart-page/cart-page.route";
import Login from "./routes/login-logout/login.route";
import SearchResult from "./routes/searchResult/searchResult.route";
import NewProduct from "./routes/new-product/new-product.component";
import ProductEditingForm from "./routes/product-editting/product-editing-form.component";
import CategoryRoute from "./routes/category/category.route";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
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
        <Route path="/category" element={<CategoryRoute />} />

        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
