import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Product } from "../types/ProductType";
import { FileAndNewProductForm } from "../types/NewProductType";

const initialState: Product[] = [];
const token = localStorage.getItem("userToken");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async () => {
  try {
    const products = await axios.get("https://luxelane.azurewebsites.net/api/v1/product");
    return products.data;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
});
export const deleteProduct = createAsyncThunk("deleteProduct", async (product: number) => {
  try {
    const response = await axios.delete(`https://luxelane.azurewebsites.net/api/v1/product/${product}`, {
      headers: headers,
    });
    const data = response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
});
export const editProductThunk = createAsyncThunk("editProduct", async (product: Partial<Product>) => {
  try {
    const response = await axios.patch(`https://luxelane.azurewebsites.net/api/v1/product/${product.id}`, {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
    const data = response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
});

export const createProduct = createAsyncThunk("createProduct", async ({ file, product }: FileAndNewProductForm) => {
  try {
    const formData = new FormData();
    const imgFile = file;
    if (imgFile) {
      formData.append("file", imgFile);
    }
    formData.append("upload_preset", "luxelane");
    //Cloud name is public because for some reason the deployed app cannot access it in .env file
    await axios
      .post(`https://api.cloudinary.com/v1_1/dpmgsws1u/image/upload`, formData)
      .then(async (res) => {
        const imageUrl = res.data.secure_url;
        const newProduct = { ...product, images: [imageUrl] };
        const token = localStorage.getItem("userToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await axios
          .post("https://luxelane.azurewebsites.net/api/v1/product", newProduct, {
            headers: headers,
          })
          .then((res) => {
            const data = res.data;
            return data;
          });
      });
  } catch (error) {
    const err = error as AxiosError;
    return err;
  }
});

const ProductsSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
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
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[] | AxiosError>) => {
        if (action.payload && "message" in action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
      })
      .addCase(editProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        return state.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      });
  },
});
export const productReducer = ProductsSlice.reducer;
export const { sortByPrice } = ProductsSlice.actions;
export default ProductsSlice;
