import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHook";
import {
  increaseItem,
  decreaseItem,
  removeItem,
} from "../../../redux/carttems-reducer.redux";

import "./cart-page.routes.styles.scss";

const CartPage = () => {
  const cartItem = useAppSelector((state) => state.CartItemReducer);
  localStorage.setItem("cartItemArray", JSON.stringify(cartItem));
  const dispatch = useAppDispatch();

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
              onClick={() => {
                dispatch(removeItem({ id: item.id }));
              }}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
