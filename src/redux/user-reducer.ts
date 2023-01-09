import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Category } from "../types/category.types";
import { Product } from "../types/product.type";
import { UserType } from "../types/user.types";

const categoriesInitialState: Category[] = [];
const categoryInitialState: Product[] = [];
const userInitialState: UserType[] = []

export const fetchAllUser = createAsyncThunk("fetchAllUser", async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/users"
    );
    const data: UserType[] = response.data;
    return data;
  } catch (error) {
    return error as AxiosError;
  }
});

export const createNewUser = createAsyncThunk(
  "createNewUser",
  async ({ file, user }) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const logInUser = createAsyncThunk("logInUser", async () => {
  try {
    const categories = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    return categories.data;
  } catch (error) {
    console.log(error);
  }
});
const LoginTokenSlice = createSlice({
  name: "LoginTokenSlice",
  initialState: categoriesInitialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(logInUser.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
  },
});
export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllUser.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } 
      return state = action.payload;
    });
  },
});
export const loginReducer = LoginTokenSlice.reducer;
export default LoginTokenSlice;
export const userReducer = UserSlice.reducer;
