import angler from "../img/angler.jpg";
import styled from "styled-components";

export default function Header() {
  return (
    <AppHeader>
      <h1>Catch</h1>
      <img src={angler} alt="photo of angler" />
      <h1>Share</h1>
    </AppHeader>
  );
}

const AppHeader = styled.header`
  background-color: var(--color-three);
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  gap: 6rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 5;

  img {
    border-radius: 100%;
    position: absolute;
    top: 0.3rem;
    width: 5rem;
  }
`;
