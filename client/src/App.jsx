import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Map from "./components/Map";
import Weather from "./components/Weather";
import Account from "./components/Account";
import { useEffect, useState } from "react";

export default function App() {
  const initialCatchCard = {
    name: "TestUser",
    fishtype: "",
    datetime: "",
    length: 1,
    weight: 0.23,
    latlng: [0, 0],
    bait: "",
    depth: 1.2,
    tackle: "",
    img: "",
  };

  const [singleCatchCard, setSingleCatchCard] = useState(initialCatchCard);
  const [catchCards, setCatchCards] = useState([]);
  const [mapClicked, setMapClicked] = useState(false);

  async function fetchCatchCards() {
    const result = await fetch('api/catchcards');
    const resultJson = await result.json();
    setCatchCards(resultJson);
  }
  useEffect(() => fetchCatchCards(), []);

  const handleInputChange = (name, value) => {
    setSingleCatchCard({
      ...singleCatchCard,
      [name]: value,
    });
  };

  function toggleMapClicked() {
    setMapClicked(!mapClicked)
  }

  function addCoordinatesToCatchCard(lat, lng) {
    let latlng = [lat, lng];
    handleInputChange("latlng", latlng);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleMapClicked()
    setCatchCards([...catchCards, singleCatchCard]);
    addCatchCardToDatabase(singleCatchCard)
   };

   async function addCatchCardToDatabase(catchCard) {
    const result = await fetch('api/catchcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catchCard),
    });
    return await result.json();
  }
   
  return (
    <>
      <Header />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/map"
          element={
            <Map
              catchCard={singleCatchCard}
              catchCards={catchCards}
              onHandleSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onAddCoordinatesToCatchCard={addCoordinatesToCatchCard}
              onMapClicked={toggleMapClicked}
              mapClicked={mapClicked}
            />
          }
        />
        <Route path="/weather" element={<Weather />} />
        <Route path="/account" element={<Account />} />
      </Routes>

      <Navbar />
    </>
  );
}
