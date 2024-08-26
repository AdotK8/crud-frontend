import React, { useRef, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "90%",
  height: "80vh",
};

// Central London long/lat
const center = {
  lat: 51.509865,
  lng: -0.118092,
};

const markerPosition = {
  lat: 51.509865,
  lng: -0.118092,
};

function MapPage() {
  return (
    <APIProvider
      apiKey={process.env.MAP_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        style={containerStyle}
        defaultZoom={12}
        defaultCenter={center}
        mapId="DEMO_MAP_ID"
      >
        <Markers />
      </Map>
    </APIProvider>
  );
}

function Markers() {
  return (
    <AdvancedMarker key={"test"} position={markerPosition}>
      <Pin />
    </AdvancedMarker>
  );
}

export default React.memo(MapPage);
