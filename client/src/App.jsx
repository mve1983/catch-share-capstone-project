import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Map from "./components/Map";
import Weather from "./components/Weather";
import Account from "./components/Account";

export default function App() {
  return (
    <>
      <Header />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="weather" element={<Weather />} />
        <Route path="account" element={<Account />} />
      </Routes>

      <Navbar />
    </>
  );
}
