
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (product: number) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${product}`);
      const data = response.data
      return data
    } catch (error) {
      const err = error as AxiosError
      console.log(err);
    }
  }
);

export const editProductThunk = createAsyncThunk(
  "editProduct",
  async (product: Partial<Product>) => {
    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        {
          title: product.title,
          price: product.price,
          description: product.description,
        }
      );
      const data = response.data;
      return data;
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
        return state.filter((item) => item.id !== action.payload);
      }
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
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload && "message" in action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        const itemIndex = state.findIndex((item) => item.id === action.payload.id);
        state[itemIndex].price = action.payload.price
        state[itemIndex].title = action.payload.title
        state[itemIndex].description = action.payload.description

      });
  },
});
export const productReducer = ProductsSlice.reducer;
export const { deleteItem, sortByPrice } = ProductsSlice.actions;
export default ProductsSlice;