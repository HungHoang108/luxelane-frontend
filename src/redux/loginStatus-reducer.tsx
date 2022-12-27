import { createSlice } from "@reduxjs/toolkit";

// const initialState: false;

const LoginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: false,
  reducers: {
    isLogIn: (state, action) => {
      console.log(action.payload);
      return state = action.payload;
    },
  },
});

export const LoginReducer = LoginStatusSlice.reducer;
export const { isLogIn } = LoginStatusSlice.actions;
export default LoginStatusSlice;