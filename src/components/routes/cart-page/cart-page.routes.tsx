import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import { CartItemType } from "../../../types/cart-items.types";

import "./cart-page.routes.styles.scss";

const CartPage = ({ id }: CartItemType) => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  const dispatch = useAppDispatch();

  const increase = () => {
    const increment = {
      id: id,
      ...rest
    };
  };

  const decrease = () => {
    const decrement = {};
  };

  return (
    <div className="cartpage-box">
      {cartItem.map((item) => (
        <div className="cartpage-box-item" key={item.id}>
          <div>
            <img src={item.image} alt="" />
          </div>
          <div>
            <p>{item.itemName}</p>
          </div>
          <div className="cartpage-box-item_amount">
            <div onClick={increase}> - </div>
            <div>{item.amount} </div>
            <div onClick={decrease}> + </div>
          </div>
          <div>
            <p>{item.price} $</p>
          </div>
          <div>
            <p>x</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
