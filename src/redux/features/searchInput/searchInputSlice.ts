import { createSlice } from "@reduxjs/toolkit";

type SearchInputInitialState = {
  searchInputs: any[];
};
const initialState: SearchInputInitialState = {
  searchInputs: [],
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.searchInputs.push(action.payload);
    },
  },
});

export default searchInputSlice.reducer;
export const { searched } = searchInputSlice.actions;
