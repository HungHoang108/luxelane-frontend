import { useAppSelector } from "../../hooks/reduxHook";
import Button from "../../components/button/button.component";

import "./product.route.styles.scss";

const ProductRoute = () => {
  const singleItem = useAppSelector((state) => state.singleProductReducer);
  return (
    <div className="productRoute">
      <div className="productRoute-img">
        <div className="productRoute-img_main">
          <img src={singleItem.images[0]} alt="" />
        </div>
      </div>
      <div className="productRoute-detail">
        <div className="productRoute-detail_title-price">
          <h1>{singleItem.title}</h1>
          <span>{singleItem.price} $</span>
        </div>
        <div className="productRoute-detail_cart-description">
          <div>
            <Button
              id={singleItem.id}
              itemName={singleItem.title}
              image={singleItem.images[0]}
              price={singleItem.price}
              amount={1}
            />
          </div>
          <div>
            <h3>Description</h3>
            <p>{singleItem.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRoute;
