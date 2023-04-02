import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../types/CartItemType";

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
      // localStorage.setItem("cartItems", JSON.stringify(state));
    },
    increaseItem: (state, action) => {
      state.find((item) => item.id === action.payload.id && item.amount++);
      // localStorage.setItem("cartItems", JSON.stringify(state));
    },
    decreaseItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem?.amount === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      }
      state.map((item) => {
        if (item.id === action.payload.id && item.amount > 0) {
          return item.amount--;
        }
      });
      // localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeItem: (state, action) => {
     
      return state.filter((item) => item.id !== action.payload.id);
      
    },
  },
});

export const CartReducer = CartItemSlice.reducer;
export const { addItem, increaseItem, decreaseItem, removeItem } = CartItemSlice.actions;
export default CartItemSlice;
