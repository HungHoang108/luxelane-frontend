import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../types/cart-items.types";

const cartItems = localStorage.getItem("cartItemArray")
const initialState: CartItemType[] = [];

const CartItemSlice = createSlice({
  name: "cartItemSlice",
  initialState: initialState,
  reducers: {
    cartItemId: (state, action) => {
      const condition = (): boolean => {
        if (state.find((item) => item.id === action.payload.id)) {
          return true;
        } else {
          return false;
        }
      };
      if (condition()) {
        state.find((item) => item.id === action.payload.id && item.amount++);
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cartItemArray", JSON.stringify(state))
    },
    increaseItem: (state, action) => {
      state.find((item) => item.id === action.payload.id && item.amount++);
    },
    decreaseItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem?.amount === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      state.map((item) => {
        if (item.id === action.payload.id && item.amount > 0) {
          item.amount--;
        }
      });
    
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const CartItemReducer = CartItemSlice.reducer;
export const { cartItemId, increaseItem, decreaseItem, removeItem } =
  CartItemSlice.actions;
export default CartItemSlice;
