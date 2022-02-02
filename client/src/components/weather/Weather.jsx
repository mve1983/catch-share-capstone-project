import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useLoadScript } from "@react-google-maps/api";
import libraries from "../../lib/googleLibs";
import Search from "./WeatherSearch";
import WeatherGeoLocate from "./WeatherGeoLocate"
import kompass from "../../img/kompass.png";
import arrow from "../../img/arrow.png";
import background from "../../img/background.jpg";

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

export default function Weather({ userInfo }) {
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
      "windSpeed",
      "windDirection",
      "temperature",
      "weatherCode",
      "pressureSurfaceLevel",
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

  if (!userInfo) return <Navigate to="/" />;

  return (
    <>
      <BackgroundImage />
      <WeatherSection>
        <Search onFetchWeatherData={fetchWeatherData} />
        <WeatherGeoLocate onFetchWeatherData={fetchWeatherData} />

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
            : "Wetter..."}
        </WeatherData>
        <WeatherData>
          <KompassWrapper>
            <Kompass src={kompass} alt="Kompass" />
            <Arrow
              wind={
                weatherData24Hours.length > 0
                  ? weatherData24Hours[parseInt(weatherTime)].values
                      .windDirection
                  : ""
              }
              src={arrow}
              alt="Kompassnadel"
            />
            <Speed>
              {weatherData24Hours.length > 0
                ? Math.round(
                    weatherData24Hours[parseInt(weatherTime)].values.windSpeed /
                      0.514
                  )
                : "--"}
              kn
            </Speed>
          </KompassWrapper>
        </WeatherData>
        <WeatherData>
          {weatherData24Hours.length > 0
            ? Math.floor(
                weatherData24Hours[parseInt(weatherTime)].values
                  .pressureSurfaceLevel
              )
            : "--"}
          hPa
        </WeatherData>
      </WeatherSection>
    </>
  );
}

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 75%;
  position: fixed;
  inset: 0;
  z-index: -15;
`;

const WeatherSection = styled.section`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 7rem 1rem 1rem 1rem;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  text-align: center;
`;

const WeatherData = styled.div`
  margin: 0.5rem;
`;
const Temp = styled.div`
  margin: 0.3rem;
  font-size: 1.4rem;
`;
const Place = styled.div`
  text-align: center;
`;

const Time = styled.div`
  margin-bottom: 1rem;
`;

const KompassWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Kompass = styled.img`
  width: 16rem;
  height: 16rem;
  position: relative;
  filter: drop-shadow(0.2rem 0.1rem 0.1rem var(--color-shadow));
`;

const Arrow = styled.img`
  max-width: 5rem;
  max-height: 9rem;
  transform: rotate(${(props) => props.wind + 180}deg);
  position: absolute;
`;

const Speed = styled.div`
  position: absolute;
  font-size: 0.9rem;
  background-color: var(--color-five);
  padding: 0.3rem;
  border-radius: 9999px;
  text-shadow: none;
  z-index: 15;
`;
