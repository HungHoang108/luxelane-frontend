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
      console.log(products.data.image);
      return products.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ProductsSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    deleteItem: (
      state: Product[],
      action: {
        payload: any;
      }
    ): Product[] | undefined => {
      if (action.payload) {
        console.log(action.payload)
        return state.filter((item) => item.id !== action.payload.product.id);
      }
    },
    editItem: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.price = action.payload.price;
          item.description = action.payload.description;
          item.images = action.payload.images;
          // item.image = action.payload.images;
        }
      });
    },
    sortByPrice: (state, action) => {
      if (action.payload === "price-up") {
        state.sort((a, b) => a.price - b.price);
      } else if (action.payload === "price-down") {
        state.sort((a, b) => b.price - a.price);
      }
    },
  },
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
export const { deleteItem, editItem, sortByPrice } = ProductsSlice.actions;
export default ProductsSlice;
