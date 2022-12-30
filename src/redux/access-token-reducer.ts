import { createSlice } from "@reduxjs/toolkit";

type iniState = string | null;
const AccessTokenSlice = createSlice({
  name: "AccessTokenSlice",
  initialState: "",
  reducers: {
    accessToken: (state, action) => {
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});

export const AccessTokenReducer = AccessTokenSlice.reducer;
export const { accessToken } = AccessTokenSlice.actions;
export default AccessTokenSlice;