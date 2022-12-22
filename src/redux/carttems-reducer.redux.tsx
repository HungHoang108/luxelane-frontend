import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import { isTemplateExpression } from "typescript";
import { CartItemType } from "../types/cart-items.types";

const initialState: CartItemType[] = [];

const CartItemSlice = createSlice({
  name: "cartItemSlice",
  initialState: initialState,
  reducers: {
    cartItemId: (state, action) => {
      const condition = (): boolean => {
        if (state.find((item) => item.id === action.payload.id)) {
          return true;
        }
        return false;
      };
      if (condition()) {
        state.find((item) => item.id === action.payload.id && item.amount++);
      } else {
        state.push(action.payload);
      }
    },
    increaseItem: (state, action) => {
      state.find((item) => item.id === action.payload.id && item.amount++);
    },
    decreaseItem: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id && item.amount > 0) {
          item.amount--;
        }
      });
      state.map((item) => {
        if (item.amount >= 1) {
          return item;
        }
      });
    },
  },
});

export const CartItemReducer = CartItemSlice.reducer;
export const { cartItemId, increaseItem, decreaseItem } = CartItemSlice.actions;
export default CartItemSlice;
