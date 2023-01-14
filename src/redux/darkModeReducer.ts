import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DarkModeSlice = createSlice({
  name: "DarkModeSlice",
  initialState: false,
  reducers: {
    darkMode: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

export const DarkModeReducer = DarkModeSlice.reducer;
export const { darkMode } = DarkModeSlice.actions;
