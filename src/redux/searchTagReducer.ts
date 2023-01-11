import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SearchTagSlice = createSlice({
  name: "searchTagSlice",
  initialState: "",
  reducers: {
    searchTagAction: (state, action : PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

export const SearchTagReducer = SearchTagSlice.reducer;
export const { searchTagAction } = SearchTagSlice.actions;
export default SearchTagSlice;
