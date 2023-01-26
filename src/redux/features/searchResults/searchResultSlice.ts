import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PlaceType, SearchResultInitialState } from "./searchResult.type";

const initialState: SearchResultInitialState = {
  searchResultsLoading: false,
  searchResults: [],
  searchResultsError: "",
};

// export const fetchSearchResults = createAsyncThunk(
//   "searchInputResult/fetchSearchResults",
//   () => {
//     return axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.data);
//   }
// );

export const fetchSearchResults = createAsyncThunk(
  "searchInputResult/fetchSearchResults",
  (param: {
    apiService: any;
    request: { input: string };
    callback: (results?: readonly PlaceType[]) => void;
  }) => {
    return param.apiService.getPlacePredictions(param.request, param.callback);
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
        const { predictions } = action.payload;
        state.searchResultsLoading = false;
        state.searchResults = predictions;
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
