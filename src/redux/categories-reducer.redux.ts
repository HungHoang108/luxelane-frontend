import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Category } from "../types/category.types";
import { Product } from "../types/product.type";

const categoriesInitialState: Category[] = [];
const categoryInitialState: Product[] = [];

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const categories = await axios.get(
        "https://api.escuelajs.co/api/v1/categories"
      );
      return categories.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAllProductsInCategory = createAsyncThunk(
  "fetchAllProductInCategory",
  async (id: number) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  }
);
const CategoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState: categoriesInitialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
  },
});
export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: categoryInitialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllProductsInCategory.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
  },
});
export const categoriesReducer = CategoriesSlice.reducer;
export default CategoriesSlice;
export const categoryReducer = CategorySlice.reducer;
