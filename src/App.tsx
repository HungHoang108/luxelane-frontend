import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHook";
import { fetchAllProducts } from "./redux/products-reducer";

import Home from "./components/home/home";
import Root from "./components/root/root.component";
import NotFound from "./components/not-found/notfound.component";
import ProductList from "./components/product-list/product-list.component";
import About from "./components/about/about.component";

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
        <Route path="about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
