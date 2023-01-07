import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import {
  increaseItem,
  decreaseItem,
  removeItem,
} from "../../redux/cart-items-reducer.redux";

import "./cart-page.routes.styles.scss";

const CartPage = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  const dispatch = useAppDispatch();

  const totalCost = localStorage.getItem("totalCost");

  return (
    <div className="cartpage-box">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItem.map((item) => (
        <div className="cartpage-box-item" key={item.id}>
          <div>
            <img src={item.image} />
          </div>
          <div>
            <p>{item.itemName}</p>
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
