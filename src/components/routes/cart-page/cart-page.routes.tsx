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
  const dispatch = useAppDispatch();

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
