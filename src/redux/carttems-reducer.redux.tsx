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
  },
});

export const CartItemReducer = CartItemSlice.reducer;
export const { cartItemId } = CartItemSlice.actions;
export default CartItemSlice;
