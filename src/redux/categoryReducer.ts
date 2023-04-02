import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Category } from "../types/Category";

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk("fetchAllCategories", async () => {
  try {

    localStorage.setItem("loadingCategory", "loading");
    const category = await axios.get("https://luxelane.azurewebsites.net/api/v1/category")
    const data = category.data
    if(data){
      localStorage.setItem("loadingCategory", 'completed')
    }
    return data
  } catch (error) {
    const err = error as AxiosError;
    return err;
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
