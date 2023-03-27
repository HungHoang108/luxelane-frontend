import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, fetchCategory } from "../types/Category";

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk("fetchAllCategories", async () => {
  try {
    localStorage.setItem("loadingCategory", "loading");
    const categories = await axios.get("https://luxelane.azurewebsites.net/api/v1/category");
    const data = categories.data;
    if (data) {
      localStorage.setItem("loadingCategory", "completed");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

const CategoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
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
