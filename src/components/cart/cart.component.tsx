import React from "react";

import { useAppSelector } from "../../hooks/reduxHook";

import "./cart.component.styles.scss";

const Cart = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  console.log(cartItem);
  return (
    <div className="cartBox">
      {cartItem.map((item) => (
        // console.log(item.id)
        <p key={item.id}>{item.itemName}</p>
      ))}
    </div>
  );
};

export default Cart;
