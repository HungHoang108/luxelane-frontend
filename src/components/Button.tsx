import { useAppDispatch } from "../hooks/reduxHook";
import { addItem } from "../redux/cartReducer";
import { CartItemType } from "../types/CartItemType";

const Button_ = ({ id, itemName, price, image, amount }: CartItemType) => {
  const dispatch = useAppDispatch();

  const addProduct = () => {
    const cartItem = {
      id: id,
      itemName: itemName,
      image: image,
      price: price,
      amount: amount,
    };
    dispatch(addItem(cartItem));
  };
  return (
    <div>
      <button className="addtocart-button" onClick={addProduct}>
        Add to Cart
      </button>
    </div>
  );
};

export default Button_;
