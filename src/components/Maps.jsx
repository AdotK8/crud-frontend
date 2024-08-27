import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { fetchMappingInfo } from "../utils/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
  width: "90%",
  height: "80vh",
};

// Central London long/lat
const center = {
  lat: 51.509865,
  lng: -0.118092,
};

function MapPage() {
  const [developments, setDevelopments] = useState([]);
  const [error, setError] = useState();
  const [selectedDevelopment, setSelectedDevelopment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await fetchMappingInfo();
      console.log("result", result);
      setDevelopments(result);
    } catch (error) {
      setError(error);
    }
  };

  const handleMarkerClick = (development) => {
    setSelectedDevelopment(development);
  };

  const developmentViewClickHandler = (id) => {
    navigate(`/development/${id}`);
  };

  return (
    <APIProvider
      apiKey={process.env.MAP_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        style={containerStyle}
        defaultZoom={11}
        defaultCenter={center}
        mapId="DEMO_MAP_ID"
      >
        {developments.length > 0 && (
          <Markers
            developments={developments}
            onMarkerClick={handleMarkerClick}
          />
        )}

        {selectedDevelopment && (
          <InfoWindow
            position={{
              lat: selectedDevelopment.coords[0].latitude,
              lng: selectedDevelopment.coords[0].longitude,
            }}
            onCloseClick={() => setSelectedDevelopment(null)}
          >
            <strong
              onClick={() =>
                developmentViewClickHandler(selectedDevelopment._id)
              }
            >
              {selectedDevelopment.name}
            </strong>
            <div>{selectedDevelopment.completionYear}</div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

function Markers({ developments, onMarkerClick }) {
  return (
    <>
      {developments.map((development) => (
        <AdvancedMarker
          key={development._id}
          position={{
            lat: development.coords[0].latitude,
            lng: development.coords[0].longitude,
          }}
          onClick={() => onMarkerClick(development)}
        >
          <Pin />
        </AdvancedMarker>
      ))}
    </>
  );
}

export default React.memo(MapPage);
