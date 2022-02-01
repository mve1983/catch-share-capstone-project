import logo from "../../img/logo.png"
import styled from "styled-components";

export default function Header() {
  return (
    <AppHeader>
      <Headline1>Catch</Headline1>
      <img src={logo} alt="angler" />
      <Headline2>Share</Headline2>
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

const Headline1 = styled.h1`
  color: var(--color-five);
  margin: 0;
  padding: 0.3rem 0 0.3rem 0;
  position: fixed;
  left: 2rem;
  z-index: 10;
`

const Headline2 = styled.h1`
  color: var(--color-five);
  margin: 0;
  padding: 0.3rem 0 0.3rem 0;
  position: fixed;
  right: 2rem;
  z-index: 10;
`
