import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Footer>
      <AppNavbar>
        <NavLink to="/">Home</NavLink>

        <NavLink to="map">Map</NavLink>

        <NavLink to="weather">Weather</NavLink>

        <NavLink to="account">Account</NavLink>
      </AppNavbar>
    </Footer>
  );
}

// styled components from here to end

const Footer = styled.footer`
  background-color: var(--background-two);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
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
    font-size: 1.2rem;
    flex-grow: 1;
    padding: 1rem 0 1rem 0;
    text-align: center;
    color: black;
    text-decoration: none;
  }

  a:hover {
    background-color: var(--color-two);
  }

  .active {
    background-color: var(--color-two);
  }
`;
