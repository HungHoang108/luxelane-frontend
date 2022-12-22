import { ButtonType } from "../../types/button.types";
import { useAppDispatch } from "../../hooks/reduxHook";
import { cartItemId } from "../../redux/carttems-reducer.redux";
import { CartItemType } from "../../types/cart-items.types";
import { Product } from "../../types/product.type";

import "./button.component.styles.scss";
// { name, id }: ButtonType,
const Button = ({ id, itemName }: CartItemType) => {
  const dispatch = useAppDispatch();

  const addProduct = () => {
    const cartItem = {
        id: id,
        itemName: itemName
    }
    dispatch(cartItemId(cartItem));
  };
  return (
    <div>
      <button onClick={addProduct}>clic {itemName}</button>
    </div>
  );
};

export default Button;
