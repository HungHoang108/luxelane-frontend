import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { SingleProduct } from "../types/ProductType";

const initialState: any = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  images: [],
};

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id: number) => {
    try {
      const response = await axios.get(
        `https://luxelane.azurewebsites.net/api/v1/product/${id}`
      );
      const data = response.data
      return data;
      
    } catch (error) {
      const err = error as AxiosError;
      return err
    }
  }
);
const SingleProductSlice = createSlice({
  name: "SingleProductSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchSingleProduct.fulfilled,
      (state, action: PayloadAction<SingleProduct | AxiosError>) => {
        if (action.payload && "message" in action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
   
      }
    );
  },
});
export default SingleProductSlice;
export const singleProductReducer = SingleProductSlice.reducer;
