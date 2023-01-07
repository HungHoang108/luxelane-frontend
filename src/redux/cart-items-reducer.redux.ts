import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../types/cart-items.types";

const initialState: CartItemType[] = [];

const CartItemSlice = createSlice({
  name: "cartItemSlice",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const condition = state.find((item) => item.id === action.payload.id);

      if (condition) {
        state.find((item) => item.id === action.payload.id && item.amount++);
      } else {
        state.push(action.payload);
      }
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
export const { addItem, increaseItem, decreaseItem, removeItem } =
  CartItemSlice.actions;
export default CartItemSlice;
