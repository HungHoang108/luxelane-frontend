import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface loginData {
  email: string;
  password: string;
}

export const userLoginToken = createAsyncThunk(
  "userLoginToken",
  async (userEmailAndPassword: loginData) => {
    try {
      const loginResponse = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        userEmailAndPassword
      );
      const data = loginResponse.data.access_token;
      // const nav = useNavigate();
      // data && nav("/");
      console.log(data);
      localStorage.setItem("userToken", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSessionInfo = createAsyncThunk("userSessionInfo", async () => {
  const userToken = localStorage.getItem("userToken");
  console.log("test", userToken);
  if (userToken) {
    const sessionResponse = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const data = sessionResponse.data.role;
    // const nav = useNavigate();
    // data && nav("/");
    console.log("call-1");

    localStorage.setItem("role", data);
    // return data;
  }
});

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: "",
  reducers: {
    getUserSession: (state, action) => {
      console.log(state);
    },
  },
  extraReducers: (build) => {
    build.addCase(userSessionInfo.fulfilled, (state, action) => {
      return state;
    });
  },
});
export const userReducer = UserSlice.reducer;
export default UserSlice;
