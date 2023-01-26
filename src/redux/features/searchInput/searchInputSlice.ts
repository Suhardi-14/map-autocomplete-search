import { createSlice } from "@reduxjs/toolkit";
import { PlaceType } from "../searchResults/searchResult.type";

type SearchInputInitialState = {
  searchInputs: PlaceType[];
};
const initialState: SearchInputInitialState = {
  searchInputs: [],
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.searchInputs.unshift(action.payload);
    },
  },
});

export default searchInputSlice.reducer;
export const { searched } = searchInputSlice.actions;
