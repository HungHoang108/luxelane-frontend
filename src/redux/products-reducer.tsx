import React from "react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Product } from "../types/product.type";
import { access } from "fs";

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
  reducers: {
    sortByPrice: (
      state: Product[],
      action: {
        payload: any;
        type: string;
      }
    ): Product[] | undefined => {
      // if (action.payload === "price-up") {
      //   state.sort((a, b) => a.price - b.price);
      // } else if (action.payload === "price-down") {
      //   state.sort((a, b) => b.price - a.price);
      // } else if (action.payload === "Shoes") {
      //   state.filter((product) => {
      //     return product.category.name === action.payload;
      //   });
      // }

      // const categoryCheck = state.find(
      //   (product) => product.category.name === action.payload
      // );
      // if (categoryCheck) {
      //   const result = state.filter((product) =>  product.category.name === action.payload);
      //   console.log(result);
      //   return result;
      // } else {
      //   return state;
      // }
      switch (action.payload) {
        case "price-up":
          state.sort((a, b) => a.price - b.price);
          break;
        case "price-down":
          state.sort((a, b) => b.price - a.price);
          break;
        case "Shoes":
          const shoesArr = state.filter(
            (product) => product.category.name === "Shoes"
          );
          return shoesArr;
          break;
        case "Clothes":
          const clothesArr = state.filter(
            (product) => product.category.name === "Clothes"
          );
          return clothesArr;
          break;
        case "Electronics":
          const elecArr = state.filter(
            (product) => product.category.name === "Electronics"
          );
          return elecArr;
          break;
        case "Furniture":
          const furArr = state.filter(
            (product) => product.category.name === "Furniture"
          );
          return furArr;
          break;
        case "Others":
          const otherArr = state.filter(
            (product) => product.category.name === "Others"
          );
          return otherArr;
          break;
        default:
          return state;
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
export const { sortByPrice } = ProductsSlice.actions;
export default ProductsSlice;
