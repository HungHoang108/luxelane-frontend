import React from "react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Product } from "../types/product.type";

const initialState: Product[] = [];

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const products = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      return products.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ProductsSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
  },
});
export const productReducer = ProductsSlice.reducer;
export default ProductsSlice;
