import { useLoadScript } from "@react-google-maps/api";
import { createContext, ReactNode, useContext, useEffect } from "react";

type MapApiContextType = {
  isLoaded: boolean;
  autocompleteService: { current: any };
};

const MapApiContext = createContext<MapApiContextType>({} as MapApiContextType);

const MapApiProvider = ({ children }: { children: ReactNode }) => {
  const autocompleteService = { current: null };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
    libraries: ["places"],
  });

  // check if map api script is loaded then instanciate the autocomplete service
  useEffect(() => {
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  return (
    <MapApiContext.Provider value={{ isLoaded, autocompleteService }}>
      {children}
    </MapApiContext.Provider>
  );
};

export const useMapApi = () => useContext(MapApiContext);
export default MapApiProvider;
