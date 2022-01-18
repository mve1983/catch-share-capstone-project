import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Footer>
      <AppNavbar>
        <NavLink to="/">Start</NavLink>

        <NavLink to="/map">Karte</NavLink>

        <NavLink to="weather">Wetter</NavLink>

        <NavLink to="account">Account</NavLink>
      </AppNavbar>
    </Footer>
  );
}

const Footer = styled.footer`
  background-color: var(--color-three);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const AppNavbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-basis: 100%;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;

  a {
    color: var(--color-two);
    text-shadow: -1px -1px 0 var(--color-one), 1px -1px 0 var(--color-one),
      -1px 1px 0 var(--color-one), 1px 1px 0 var(--color-one);
    font-size: 1.2rem;
    flex-grow: 1;
    padding: 1rem 0 1rem 0;
    text-align: center;
    text-decoration: none;
  }

  a:hover {
    background-color: var(--color-two);
  }

  .active {
    background-color: var(--color-two);
  }
`;
