import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLoadScript } from "@react-google-maps/api";
import libraries from "../lib/googleLibs";
import Search from "./WeatherSearch";

const weatherCode = [
  [0, "Unbekannt"],
  [1000, "Klar, Sonnig"],
  [1100, "Überwiegend Klar"],
  [1101, "Teilweise Bewölkt"],
  [1102, "Überwiegend Bewölkt"],
  [1001, "Bewölkt"],
  [2000, "Nebel"],
  [2100, "Leichter Nebel"],
  [4000, "Nieselregen"],
  [4001, "Regen"],
  [4200, "Leichter Regen"],
  [4201, "Starker Regen"],
  [5000, "Schneefall"],
  [5001, "Schneegestöber"],
  [5100, "Leichter Schneefall"],
  [5101, "Starker Schneefall"],
  [6000, "Gefrierender Nieselregen"],
  [6001, "Gefrierender Regen"],
  [6200, "leichter gefrierender Regen"],
  [6201, "starker gefrierender Regen"],
  [7000, "Hagel"],
  [7101, "Starker Hagel"],
  [7102, "Leichter Hagel"],
  [8000, "Gewitter"],
];

export default function Weather() {
  let dateHelper = new Date().toISOString();
  let yyyy = dateHelper.substring(0, 4);
  let dd = dateHelper.substring(8, 10);
  let mm = dateHelper.substring(5, 7);
  let time = parseInt(dateHelper.substring(11, 13)) + 1;
  const initialDate = `${dd}.${mm}.${yyyy} / ${time} Uhr`;

  const [weatherData24Hours, setWeatherData24Hours] = useState([]);
  const [weatherTime, setWeatherTime] = useState("0");
  const [dateToShow, setDateToShow] = useState(initialDate);
  const [searchedPlace, setSearchedPlace] = useState("Ort...");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  function currentWatch(event) {
    let yyyy = weatherData24Hours[event.target.value].startTime.substring(0, 4);
    let dd = weatherData24Hours[event.target.value].startTime.substring(8, 10);
    let mm = weatherData24Hours[event.target.value].startTime.substring(5, 7);
    let time = weatherData24Hours[event.target.value].startTime.substring(
      11,
      13
    );
    setWeatherTime(event.target.value);
    setDateToShow(`${dd}.${mm}.${yyyy} / ${time} Uhr`);
  }

  async function fetchWeatherData({ lat, lng }, address) {
    const currentDate = new Date().toISOString().substring(0, 19) + "Z";
    const currentDatePlusOneDay =
      new Date(Date.now() + 3600 * 1000 * 24).toISOString().substring(0, 19) +
      "Z";
    const fields = [
      "precipitationIntensity",
      "precipitationType",
      "precipitationProbability",
      "windSpeed",
      "windDirection",
      "temperature",
      "weatherCode",
      "pressureSurfaceLevel",
      "pressureSeaLevel",
    ];

    try {
      const data = await fetch(
        `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=${fields}&units=metric&timesteps=1h&startTime=${currentDate}&endTime=${currentDatePlusOneDay}&timezone=Europe/Berlin&apikey=${
          import.meta.env.VITE_TOMORROWIO_API_KEY
        }`
      );
      const result = await data.json();
      setWeatherData24Hours(result.data.timelines[0].intervals);
      setSearchedPlace(address);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loadError) return "Load Error";
  if (!isLoaded) return "Loading Map";

  return (
    <>
      <Search onFetchWeatherData={fetchWeatherData} />

      <OutputArea>
        <Time>
          <button
            className={
              "weather-page-button-normal " +
              (weatherTime === "0" ? "weather-page-button-active " : "")
            }
            value="0"
            onClick={currentWatch}
            disabled={weatherData24Hours.length === 0 ? true : false}
          >
            Aktuell
          </button>
          <button
            className={
              "weather-page-button-normal " +
              (weatherTime === "2" ? "weather-page-button-active " : "")
            }
            value="2"
            onClick={currentWatch}
            disabled={weatherData24Hours.length === 0 ? true : false}
          >
            in 2 Std.
          </button>
          <button
            className={
              "weather-page-button-normal " +
              (weatherTime === "4" ? "weather-page-button-active " : "")
            }
            value="4"
            onClick={currentWatch}
            disabled={weatherData24Hours.length === 0 ? true : false}
          >
            in 4 Std.
          </button>
          <button
            className={
              "weather-page-button-normal " +
              (weatherTime === "8" ? "weather-page-button-active " : "")
            }
            value="8"
            onClick={currentWatch}
            disabled={weatherData24Hours.length === 0 ? true : false}
          >
            in 8 Std.
          </button>
        </Time>

        <WeatherData>{dateToShow}</WeatherData>
        <Place>{searchedPlace}</Place>
        <Temp>
          {weatherData24Hours.length > 0
            ? Math.floor(
                weatherData24Hours[parseInt(weatherTime)].values.temperature
              )
            : "--"}
          °C
        </Temp>
        <WeatherData>
          {weatherData24Hours.length > 0
            ? weatherCode
                .filter(
                  (codenumber) =>
                    codenumber[0] ===
                    weatherData24Hours[parseInt(weatherTime)].values.weatherCode
                )
                .map((foundItem) => foundItem[1])
            : "--"}
        </WeatherData>
        <WeatherData>Nordost 14km/h</WeatherData>
        <WeatherData>1034 hPa</WeatherData>
      </OutputArea>
    </>
  );
}

const OutputArea = styled.div`
  margin: 1rem 2rem 5rem 2rem;
  padding: 1rem;
  border: 0.3rem solid var(--color-five);
  border-radius: 0.3rem;
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  text-align: center;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
`;

const WeatherData = styled.div`
  font-size: 1.2rem;
  margin: 1rem;
`;
const Temp = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;
const Place = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-weight: bold;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;
