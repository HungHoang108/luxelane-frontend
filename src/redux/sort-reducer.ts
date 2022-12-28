import { createSlice } from "@reduxjs/toolkit";

const SortSlice = createSlice({
  name: "searchTagSlice",
  initialState: "",
  reducers: {
    sortByPrice: (state, action) => {
       return state = action.payload

    },
    sortByCategory: (state, action) => {
        return state = action.payload
    }
  },
});

export const SortReducer = SortSlice.reducer;
export const { sortByPrice, sortByCategory} = SortSlice.actions;
export default SortSlice;
