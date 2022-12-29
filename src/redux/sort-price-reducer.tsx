import { createSlice } from "@reduxjs/toolkit";

const SortPriceSlice = createSlice({
  name: "SortPriceSlice",
  initialState: "",
  reducers: {
    sortByPrice: (state, action) => {
       return state = action.payload
    }
  },
});

export const SortPriceReducer = SortPriceSlice.reducer;
export const { sortByPrice } = SortPriceSlice.actions;
export default SortPriceSlice;
