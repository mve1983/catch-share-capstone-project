import logo from "../../img/logo.png";
import styled from "styled-components";

export default function Header() {
  return (
    <AppHeader>
      <Headline>
        Catch
        <img src={logo} alt="angler" />
        Share
      </Headline>
    </AppHeader>
  );
}

const AppHeader = styled.header`
  background-color: var(--color-four);
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  gap: 7rem;
  position: fixed;
  height: 3.5rem;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;

  img {
    position: fixed;
    top: -0.5rem;
    width: 6rem;
    z-index: 10;
  }
`;

const Headline = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 7rem;
  color: var(--color-five);
  margin: 0;
  padding: 0.3rem 0 0.3rem 0;
  position: fixed;
  z-index: 10;
`;
