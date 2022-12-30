import { createSlice } from "@reduxjs/toolkit";

const AccessTokenSlice = createSlice({
  name: "AccessTokenSlice",
  initialState: "",
  reducers: {
    accessTokenn: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const AccessTokenReducer = AccessTokenSlice.reducer;
export const { accessTokenn } = AccessTokenSlice.actions;
export default AccessTokenSlice;
