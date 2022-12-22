import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../types/cart-items.types";


const initialState: CartItemType[] = [];

const CartItemSlice = createSlice({
  name: "cartItemSlice",
  initialState: initialState,
  reducers: {
    cartItemId: (state, action) => {
        state.push(action.payload)
       
    }
  },
});

export const CartItemReducer = CartItemSlice.reducer
export const {cartItemId} = CartItemSlice.actions
export default CartItemSlice;
