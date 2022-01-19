import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import mapStyle from "../lib/mapStyle";
import libraries from "../lib/googleLibs";
import Search from "./MapSearch";
import CatchForm from "./catchCardForm/CatchForm";
import {
  addCatchCardToDatabase,
  fetchAllMapMarkers,
  fetchCatchCardsOnMarker,
} from "../lib/fetches-mongodb";
import CatchCard from "./CatchCard";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const mapCenter = {
  lat: 53.55032,
  lng: 9.99276,
};

const mapOptions = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const initialCatchCard = {
    name: "TestUser",
    fishtype: "",
    datetime: "",
    length: 1,
    weight: 0.23,
    latlng: { lat: 0, lng: 0 },
    bait: "",
    depth: 1.2,
    tackle: "",
    img: "",
  };

  const [singleCatchCard, setSingleCatchCard] = useState(initialCatchCard);
  const [catchCards, setCatchCards] = useState([]);
  const [mapClicked, setMapClicked] = useState(false);
  const [clickedMarker, setClickedMarker] = useState({});
  const [mapMarkers, setMapMarkers] = useState([]);

  function activateMarker(marker) {
    setClickedMarker(marker);
    fetchCatchCardsOnMarker(marker).then((data) => setCatchCards([...data]));
  }

  function addCoordinatesToCatchCard(newlat, newlng) {
    let latlng = { lat: newlat, lng: newlng };
    handleInputChange("latlng", latlng);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setMapClicked(!mapClicked);
    addCatchCardToDatabase(singleCatchCard);
  };

  const cancelSubmit = (event) => {
    event.preventDefault();
    setMapClicked(!mapClicked);
    setMapMarkers(mapMarkers.slice(0, -1));
  };

  const handleInputChange = (name, value) => {
    setSingleCatchCard({
      ...singleCatchCard,
      [name]: value,
    });
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const addNewMapMarker = useCallback((event) => {
    setMapClicked(!mapClicked);
    let newlat = event.latLng.lat();
    let newlng = event.latLng.lng();
    setMapMarkers((currentMarkers) => [
      ...currentMarkers,
      { lat: newlat, lng: newlng },
    ]);
    addCoordinatesToCatchCard(newlat, newlng);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    fetchAllMapMarkers()
      .then((data) => {
        const markersWithoutDoubleEntries = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (element) =>
                element.lat === value.lat && element.lng === value.lng
            )
        );
        setMapMarkers(markersWithoutDoubleEntries);
      })
      .catch((error) => error.message);
    mapRef.current = map;
  }, []);

  const goTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (loadError) return "Load Error";
  if (!isLoaded) return "Loading Map";

  const fishMarker = {
    path: "M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z",
    fillColor: "darkred",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1.5,
    anchor: new google.maps.Point(15, 15),
  };
  return (
    <>
      <MapWrapper>
        <Search onGoTo={goTo} />
        {mapClicked && (
          <SmoothCatchFormFadeIn>
            <CatchForm
              catchCard={singleCatchCard}
              onHandleSubmit={handleSubmit}
              onCancelSubmit={cancelSubmit}
              onInputChange={handleInputChange}
            />
          </SmoothCatchFormFadeIn>
        )}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={mapCenter}
          options={mapOptions}
          onClick={addNewMapMarker}
          onLoad={onMapLoad}
        >
          {mapMarkers.length > 0 &&
            mapMarkers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={fishMarker}
                onClick={() => activateMarker(marker)}
              />
            ))}
        </GoogleMap>
      </MapWrapper>

      <CatchCard catchCards={catchCards} />
    </>
  );
}

const MapWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  margin: 6rem 1rem 1rem 1rem;
`;

const SmoothCatchFormFadeIn = styled.section`
  animation: fadein 1s linear;
  position: relative;
  z-index: 10;

  @keyframes fadein {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;
