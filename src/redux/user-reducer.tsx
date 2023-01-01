import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface loginData {
    email: string
    password: string
}
const initialState: loginData = {
    email: "",
    password: ""
};

export const userLoginToken = createAsyncThunk("userLoginToken", async (userEmailAndPassword : loginData) => {
  try {
    const loginResponse = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login", userEmailAndPassword
    );
    const data = loginResponse.data.access_token;
console.log(data)
    // const nav = useNavigate();
    // data && nav("/");

    localStorage.setItem("userToken", data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const UserSlice = createSlice({
  name: "categoriesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(userLoginToken.fulfilled, (state, action) => {
      console.log(state);
    });
  },
});
export const userReducer = UserSlice.reducer;
export default UserSlice;
