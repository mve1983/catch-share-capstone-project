import { useState } from "react";
import styled from "styled-components";
import { useLoadScript } from "@react-google-maps/api";
import libraries from "../lib/googleLibs";
import Search from "./WeatherSearch";

// "weatherCode": {
//   "0": "Unknown",
//   "1000": "Clear, Sunny",
//   "1100": "Mostly Clear",
//   "1101": "Partly Cloudy",
//   "1102": "Mostly Cloudy",
//   "1001": "Cloudy",
//   "2000": "Fog",
//   "2100": "Light Fog",
//   "4000": "Drizzle",
//   "4001": "Rain",
//   "4200": "Light Rain",
//   "4201": "Heavy Rain",
//   "5000": "Snow",
//   "5001": "Flurries",
//   "5100": "Light Snow",
//   "5101": "Heavy Snow",
//   "6000": "Freezing Drizzle",
//   "6001": "Freezing Rain",
//   "6200": "Light Freezing Rain",
//   "6201": "Heavy Freezing Rain",
//   "7000": "Ice Pellets",
//   "7101": "Heavy Ice Pellets",
//   "7102": "Light Ice Pellets",
//   "8000": "Thunderstorm"
// },

const weekdays = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  async function fetchWeatherData({ lat, lng }) {
    const currentDate = new Date().toISOString().substring(0,19)+"Z";
    const currentDatePlusOneDay = new Date(
      Date.now() + 3600 * 1000 * 24
    ).toISOString().substring(0,19)+"Z";

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

const timezone = {
  "Europe/Berlin": "+01:00",
}

    const data = await fetch(
      `https://api.tomorrow.io/v4/timelines?location=${lat},${lng}&fields=${fields}&units=metric&timesteps=1h&startTime=${currentDate}&endTime=${currentDatePlusOneDay}&timezone=Europe/Berlin&apikey=${
        import.meta.env.VITE_TOMORROWIO_API_KEY
      }`
    );
    const result = await data.json();
    setWeatherData(result.data);
  }

  console.log(weatherData);

  if (loadError) return "Load Error";
  if (!isLoaded) return "Loading Map";

  return (
    <>
      <Search onFetchWeatherData={fetchWeatherData} />

      <OutputArea>
        <Time>
          <WeatherButton>Aktuell</WeatherButton>
          <WeatherButton>in 2 Std.</WeatherButton>
          <WeatherButton>in 4 Std.</WeatherButton>
          <WeatherButton>in 8 Std.</WeatherButton>
        </Time>
        <WeatherData>FOLGT</WeatherData>
        <Place>Hamburg, DE</Place>
        <Temp>15°C</Temp>
        <WeatherData>Bewölkt</WeatherData>
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
  margin: 1.8rem 1rem;
`;
const Temp = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;
const Place = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;
const WeatherButton = styled.button`
  border: none;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  margin: 0.2rem 0.3rem;
  padding: 0.3rem 0.3rem;

  button:hover {
    background-color: var(--color-five);
    color: var(--color-four);
  }
`;
