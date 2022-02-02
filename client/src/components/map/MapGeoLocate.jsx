import styled from "styled-components";

export default function GeoLocate({ onGoTo }) {
  return (
    <LocateButton
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onGoTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Meine <br />
      Position
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
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0.2rem;
  z-index: 10;
`;
