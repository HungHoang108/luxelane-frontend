import { createSlice } from "@reduxjs/toolkit";

const SortSlice = createSlice({
  name: "SortSlice",
  initialState: "",
  reducers: {
    sortByCategory: (state, action) => {
        return state = action.payload
    }
  },
});

export const SortReducer = SortSlice.reducer;
export const { sortByCategory} = SortSlice.actions;
export default SortSlice;
