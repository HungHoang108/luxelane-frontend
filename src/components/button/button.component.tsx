import { ButtonType } from "../../types/button.types";
import { useAppDispatch } from "../../hooks/reduxHook";
import { cartItemId } from "../../redux/carttems-reducer.redux";
import { CartItemType } from "../../types/cart-items.types";
import { Product } from "../../types/product.type";

import "./button.component.styles.scss";
// { name, id }: ButtonType,
const Button = ({ id, itemName, price, image, amount }: CartItemType) => {
  const dispatch = useAppDispatch();

  const addProduct = () => {
    const cartItem = {
      id: id,
      itemName: itemName,
      image: image,
      price: price,
      amount: amount,
    };
    dispatch(cartItemId(cartItem));
  };
  return (
    <div>
      <button onClick={addProduct}>Add to Cart</button>
    </div>
  );
};

export default Button;
