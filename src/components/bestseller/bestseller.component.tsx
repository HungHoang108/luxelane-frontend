import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";

import { fetchAllProducts } from "../../redux/products-reducer";

import "./bestseller.component.styles.scss";

const Bestseller = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <h1>BestSeller</h1>
      <div className="products">
        {products.slice(0, 15).map((product) => (
          <div className="products-card">
            <img src={product.images[0]} alt="" />
            <h4>{product.title}</h4>
            <h4>{product.price}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Bestseller;
