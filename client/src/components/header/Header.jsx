import logo from "../../img/logo.png";
import styled from "styled-components";

export default function Header() {
  return (
    <AppHeader>
      <Headline>
        {" "}
        <h1>Catch</h1> <h1>Share</h1>{" "}
      </Headline>
      <img src={logo} alt="angler" />
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
    position: absolute;
    top: -0.5rem;
    width: 6rem;
    z-index: 10;
  }
`;

const Headline = styled.div`
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
