import { useState } from "react";
import styled from "styled-components";


const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
let today = new Date();
let day = weekdays[today.getDay()]
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();
const date =`${day}, ${dd}.${mm}.${yyyy}`

export default function Weather() {

  const [searchedPlace, setSearchedPlace] = useState("")



function dateHelper() {
 
}

function inputChange(event) {
  setSearchedPlace(event.target.value)
}

async function fetchWeatherData(place) {
 const data = await fetch(`https://api.openweathermap.org/data/2.5/q=Hamburg&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
 const result = data.json()
 console.log(result);
}

return (
  <WeatherWrapper>

      <div><Search type="text" onChange={inputChange} value={searchedPlace} placeholder="Suche Ort..." /></div> 
      
      <OutputArea>
      <WeatherData>{date}</WeatherData>
      <Place>Hamburg, DE</Place>
      <Temp>15°C</Temp>
      <WeatherData>Bewölkt</WeatherData>
      <WeatherData>Nordost 14km/h</WeatherData>
      <WeatherData>1034 hPa</WeatherData>
      </OutputArea>
    
  </WeatherWrapper>
)
}

const WeatherWrapper = styled.section`
  margin: 6rem 1rem 5rem 1rem;
  text-align: center;
`;

const Search = styled.input`
border-radius: 0.3rem;
box-shadow: 0.2rem 0.1rem var(--color-four);
width: 80%;
height: 2rem;
padding: 0.5rem;
opacity: 75%;

:focus {
  opacity: 100%;
}
`;

const OutputArea = styled.div`
margin: 2rem 1rem 5rem 1rem;
padding: 1rem;
border: 0.3rem solid var(--color-five);
border-radius: 0.3rem;
box-shadow: 0.2rem 0.1rem var(--color-four);
text-align: center
`

const DateDiv = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`
const WeatherData = styled.div`
  font-size: 1.2rem; 
  margin: 2.2rem 1rem;
`
const Temp = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`
const Place = styled.div`
font-size: 1.6rem;
font-weight: bold;
`