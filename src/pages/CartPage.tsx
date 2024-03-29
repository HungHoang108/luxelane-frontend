import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import { increaseItem, decreaseItem, removeItem } from "../redux/cartReducer";

const CartPage = () => {
  const cartItem = useAppSelector((state) => state.CartReducer);
  const dispatch = useAppDispatch();

  const totalCost = localStorage.getItem("totalCost");

  return (
    <div className="cartpage-box">
      {cartItem.map((item) => (
        <div className="cartpage-box-item" key={item.id}>
          <div>
            <img src={item.image} alt="" />
          </div>
          <div>
            <p className="item-title">{item.itemName}</p>
          </div>

          <div className="cartpage-box-item_amount">
            <div>
              <button
                className="itemAmount"
                onClick={() => {
                  dispatch(decreaseItem({ id: item.id }));
                }}
              >
                -
              </button>
            </div>
            <div>{item.amount} </div>
            <div>
              <button
                className="itemAmount"
                onClick={() => {
                  dispatch(increaseItem({ id: item.id }));
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p>{item.price} $</p>
          </div>
          <div>
            <button
              className="itemAmount"
              onClick={() => {
                dispatch(removeItem({ id: item.id }));
              }}
            >
              x
            </button>
          </div>
        </div>
      ))}
      <span className="total">Total: {totalCost} $</span>
    </div>
  );
};

export default CartPage;
