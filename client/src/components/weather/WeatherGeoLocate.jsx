import styled from "styled-components";

export default function GeoLocate({ onFetchWeatherData }) {
  return (
    <LocateButton
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onFetchWeatherData(
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              "Deine Position"
            );
          },
          () => null
        );
      }}
    >
      Meine Position
    </LocateButton>
  );
}

const LocateButton = styled.button`
  outline: none;
  border: none;
  border-radius: 0.3rem;
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  background-color: var(--color-five);
  color: var(--color-three);
  cursor: pointer;
  font-size: 0.7rem;
  padding: 0.2rem 1rem;
  margin: 0.5rem;
`;
