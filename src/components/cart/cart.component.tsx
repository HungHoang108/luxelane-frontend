import React from "react";

import { useAppSelector } from "../../hooks/reduxHook";

import "./cart.component.styles.scss";

const Cart = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);

  return (
    <>
      <div className="cartBox">
        <div className="cartBox-items">
          {cartItem.map((item) => (
            <div className="cartBox-item" key={item.id}>
              <div>
                <img src={item.image} alt="" />
              </div>
              <div>
                <p>{item.itemName}</p>
              </div>
              <div>
                <p>{item.amount} x</p>
                <p>{item.price} $</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cartBox-button">
          <button>GO TO CART</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
