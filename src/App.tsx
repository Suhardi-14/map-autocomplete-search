import { useEffect } from "react";
import "./App.css";
import MapAutoComplete from "./components/MapAutoComplete";
import { useCustomDispatch, useCustomSelector } from "./redux/customReduxHooks";
import { fetchSearchResults } from "./redux/features/searchResults/searchResultSlice";

function App() {
  const lcoationResult = useCustomSelector((state) => state.searchResult);

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults());
  }, []);

  console.log("initial searchInput state", lcoationResult);

  return (
    <div className="App">
      <MapAutoComplete />
    </div>
  );
}

export default App;
