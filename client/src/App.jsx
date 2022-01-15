import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Map from "./components/Map";
import Weather from "./components/Weather";
import Account from "./components/Account";
import { useState } from "react";

export default function App() {
  const initialCatchCard = {
    name: "TestUser",
    fishtype: "",
    datetime: "",
    length: 1,
    weight: 0.23,
    lat: 0,
    lng: 0,
    bait: "",
    depth: 1.2,
    tackle: "",
    img: "",
  };

  const [singleCatchCard, setSingleCatchCard] = useState(initialCatchCard);
  const [catchCards, setCatchCards] = useState([]);

  const handleInputChange = (name, value) => {
    setSingleCatchCard({
      ...singleCatchCard,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
              onHandleSubmit={handleSubmit}
              onInputChange={handleInputChange}
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
