import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type SearchResultInitialState = {
  searchResultsLoading: boolean;
  searchResults: any[];
  searchResultsError: string;
};

const initialState: SearchResultInitialState = {
  searchResultsLoading: false,
  searchResults: [],
  searchResultsError: "",
};

export const fetchSearchResults = createAsyncThunk(
  "searchInputResult/fetchSearchResults",
  () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data);
  }
);

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.searchResultsLoading = true;
    });
    builder.addCase(
      fetchSearchResults.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.searchResultsLoading = false;
        state.searchResults = action.payload;
        state.searchResultsError = "";
      }
    );
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.searchResultsLoading = false;
      state.searchResultsError = action.error.message || "Something went wrong";
    });
  },
});

export default searchResultSlice.reducer;
