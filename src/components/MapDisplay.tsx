import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import MapAutoComplete from "./MapAutoComplete";

const MapDisplay = () => {
  const center = useMemo(() => {
    return { lat: 3.1475517266720208, lng: 101.69955665530095 };
  }, []);

  const [selected, setSelected] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  return (
    <>
      <GoogleMap
        zoom={17}
        center={center}
        mapContainerClassName="w-[100%] h-screen"
        options={{
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        }}
      >
        <div className="absolute flex justify-start left-4 top-4 z-50 w-full">
          <MapAutoComplete setSelected={setSelected} />
        </div>
        {selected && (
          <>
            <MarkerF
              position={selected}
              animation={google.maps.Animation.DROP}
            />
          </>
        )}
      </GoogleMap>
    </>
  );
};

export default MapDisplay;
