import { History } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import { useGoogleMap } from "@react-google-maps/api";
import parse from "autosuggest-highlight/parse";
import React, { useEffect, useMemo, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useMapApi } from "../provider/MapApiProvider";
import {
  useCustomDispatch,
  useCustomSelector,
} from "../redux/customReduxHooks";
import { searched } from "../redux/features/searchInput/searchInputSlice";
import { PlaceType } from "../redux/features/searchResults/searchResult.type";
import { fetchSearchResults } from "../redux/features/searchResults/searchResultSlice";

type MapAutocompleteProps = {
  setSelected: React.Dispatch<
    React.SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | null>
  >;
};

const MapAutoComplete = ({ setSelected }: MapAutocompleteProps) => {
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const map = useGoogleMap();
  const { autocompleteService } = useMapApi();
  const {
    searchInput: { searchInputs },
    searchResult: { searchResults, searchResultsError, searchResultsLoading },
  } = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          dispatch(
            fetchSearchResults({
              apiService: autocompleteService.current,
              request,
              callback,
            })
          );
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : searchInputs);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...searchResults];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const centerSelectedLocation = async (placeId: string) => {
    const results = await getGeocode({ placeId });
    const { lat, lng } = getLatLng(results[0]);

    setSelected({ lat, lng });
    map?.panTo({ lat, lng });
  };

  return (
    <Autocomplete
      id="google-map-demo"
      className="bg-white w-96 shadow-md"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      loading={searchResultsLoading}
      openOnFocus
      autoComplete
      includeInputInList
      filterSelectedOptions
      handleHomeEndKeys={false}
      clearOnBlur={false}
      value={value}
      noOptionsText={
        searchResultsError ? "Unexpected Error Occured" : "No location found"
      }
      onOpen={(e) => {
        if (!inputValue) setOptions(searchInputs);
      }}
      onChange={async (event: any, newValue: PlaceType | null) => {
        setValue(newValue);
        if (newValue) {
          if (
            searchInputs?.filter(
              (input) => input.place_id === newValue.place_id
            ).length === 0
          )
            dispatch(searched({ ...newValue, category: "search_input" }));

          centerSelectedLocation(newValue.place_id);
        }
      }}
      onHighlightChange={async (e, option) => {
        if (option) {
          centerSelectedLocation(option.place_id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search a Location on the Map" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                {option.category === "search_input" ? (
                  <History sx={{ color: "text.secondary" }} />
                ) : (
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                )}
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
export default MapAutoComplete;
