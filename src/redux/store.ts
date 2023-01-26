import { configureStore } from "@reduxjs/toolkit";
import searchInputReducer from "./features/searchInput/searchInputSlice";
import searchResultReducer from "./features/searchResults/searchResultSlice";

const store = configureStore({
  reducer: {
    searchInput: searchInputReducer,
    searchResult: searchResultReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
