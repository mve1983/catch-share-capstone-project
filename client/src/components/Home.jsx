import styled from "styled-components";
import background from "../img/background.jpg";

export default function Home() {
  return (
     <>
     <BackgroundImage />
    <MapWrapper>Hello World</MapWrapper>
    </>
    )
}

const MapWrapper = styled.section`
  margin: 7rem 1rem 7rem 1rem;
  text-align: center;
`;

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  inset: 0;
  z-index: -15;
`;