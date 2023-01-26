import { Box, CircularProgress } from "@mui/material";
import MapDisplay from "./components/MapDisplay";
import { useMapApi } from "./provider/MapApiProvider";

function App() {
  const { isLoaded } = useMapApi();

  return (
    <div className="App">
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
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
