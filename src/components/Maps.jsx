import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/maps.module.scss";
import {
  APIProvider,
  Map,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { fetchMappingInfo } from "../utils/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const containerStyle = {
  width: "100%",
  height: "95vh",
};

// Central London long/lat
const center = {
  lat: 51.509865,
  lng: -0.118092,
};

function Markers({ developments, onMarkerClick }) {
  const map = useMap();

  useEffect(() => {
    if (map && developments.length > 0) {
      const markers = developments.map((development) => {
        const marker = new google.maps.Marker({
          position: {
            lat: development.coords[0].latitude,
            lng: development.coords[0].longitude,
          },
          map: map,
        });

        marker.addListener("click", () => {
          onMarkerClick(development);
        });

        return marker;
      });

      new MarkerClusterer({ map, markers });

      console.log(`Created ${markers.length} markers.`);
    }
  }, [map, developments]);

  return null;
}

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
      console.log("Fetched mapping info:", result);
      setDevelopments(result);
    } catch (error) {
      setError(error);
      console.error("Error fetching mapping info:", error);
    }
  };

  const handleMarkerClick = (development) => {
    setSelectedDevelopment(development);
  };

  const developmentViewClickHandler = (id) => {
    navigate(`/development/${id}`);
  };

  return (
    <APIProvider apiKey={process.env.MAP_KEY}>
      <Map
        style={containerStyle}
        defaultZoom={12}
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
              className={styles["map-name"]}
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

export default React.memo(MapPage);
