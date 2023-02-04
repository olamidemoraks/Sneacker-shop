import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    searchItem: (state, action) => {
      state.value = action.payload.search;
    },
  },
});

export default searchSlice.reducer;
export const { searchItem } = searchSlice.actions;

export const productSearch = (state) => state.search.value;
