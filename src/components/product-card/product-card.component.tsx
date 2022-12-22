import { useAppSelector } from "../../hooks/reduxHook";

import { ProductCardList } from "../../types/product-cardlist";
import Button from "../button/button.component";

import "./product-card.component.styles.scss";

const ProductCard = ({ title, productsDisplayed }: ProductCardList) => {
  const products = useAppSelector((state) => state.productReducer);

  return (
    <>
      <h1>{title}</h1>
      <div className="products">
        {products.slice(1, productsDisplayed).map((product) => (
          <div key={product.id} className="products-card">
            <img src={product.images[0]} alt="" />
            <h4>{product.title}</h4>
            <h4>{product.price} $</h4>
            <Button
              id={product.id}
              itemName={product.title}
              image={product.images[0]}
              price={product.price}
              amount={1}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
