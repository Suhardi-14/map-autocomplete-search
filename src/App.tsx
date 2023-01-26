import { Box, Button, LinearProgress, Slider } from "@mui/material";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import MapAutoComplete from "./components/MapAutoComplete";
import MapDisplay from "./components/MapDisplay";
import NavBar from "./components/NavBar";
import PlacesAutocomplete from "./components/PlacesAutocomplete";
import { useMapApi } from "./provider/MapApiProvider";
import { useCustomDispatch, useCustomSelector } from "./redux/customReduxHooks";
import { fetchSearchResults } from "./redux/features/searchResults/searchResultSlice";

function App() {
  // const lcoationResult = useCustomSelector((state) => state.searchResult);

  // const dispatch = useCustomDispatch();

  // useEffect(() => {
  //   dispatch(fetchSearchResults());
  // }, []);

  // console.log("initial searchInput state", lcoationResult);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  //   libraries: ["places"],
  // });
  const [selected, setSelected] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  // console.log("api key", [process.env.REACT_APP_GOOGLE_MAP_API_KEY, isLoaded]);

  const { isLoaded } = useMapApi();

  return (
    <div className="App">
      {/* <NavBar /> */}
      {isLoaded ? (
        <>
          <MapDisplay />
        </>
      ) : (
        <Box
          sx={{
            width: "80%",
            height: "80vh",
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
