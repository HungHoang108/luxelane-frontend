import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchAllProducts } from "../../redux/products-reducer";

import { ProductCardList } from "../../types/product-cardlist";
import Button from "../button/button.component";

import "./product-card.component.styles.scss"

const ProductCard = ({title, productsDisplayed} : ProductCardList) => {
  const products = useAppSelector((state) => state.productReducer);

  return (
    <>
      <h1>{title}</h1>
      <div className="products">
        {products.slice(0, productsDisplayed).map((product) => (
          <div className="products-card">
            <img src={product.images[0]} alt="" />
            <h4>{product.title}</h4>
            <h4>{product.price} $</h4>
            <Button name="Add to cart"/>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
