import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { SingleProduct } from "../types/product.type";

const initialState: SingleProduct = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    images: []
};


export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id: number) => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  }
);
const SingleProductSlice = createSlice({
  name: "SingleProductSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action : PayloadAction<SingleProduct>) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
  },
});
export default SingleProductSlice;
export const singleProductReducer = SingleProductSlice.reducer;
