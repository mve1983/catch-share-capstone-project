import "./lib/css/fonts.css";
import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "./lib/utils/ScrollToTop";
import Header from "./components/header/Header";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/home/Home";
import Map from "./components/map/Map";
import Weather from "./components/weather/Weather";
import Account from "./components/account/Account";

export default function App() {

  const blankUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [userInfo, setUserInfo] = useState(null);

  const [initialUser, setInitialUser] = useState(blankUser);

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    const getInfo = JSON.parse(localStorage.getItem("__CandSUserInfo__"));
    setUserInfo(getInfo);
  }

  function setUserBackToInitial() {
    setInitialUser(blankUser)
  }

  const handleInputChange = (name, value) => {
    setInitialUser({
      ...initialUser,
      [name]: value,
    });
  };


  return (
    <>
      <Header />

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home userInfo={userInfo} initialUser={initialUser} onHandleInputChange={handleInputChange} onGetUserInfo={getUserInfo} />}
        />
        <Route path="/map" element={!userInfo ? <Navigate to="/" /> : <Map userInfo={userInfo} />} />
        <Route path="/weather" element={!userInfo ? <Navigate to="/" /> : <Weather userInfo={userInfo} />} />
        <Route path="/account" element={!userInfo ? <Navigate to="/" /> : <Account userInfo={userInfo} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Navbar userInfo={userInfo} onSetUserBackToInitial={setUserBackToInitial} onGetUserInfo={getUserInfo} />
    </>
  );
}
