import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Footer>
      <AppNavbar>
        <NavLink to="/">Start</NavLink>

        <NavLink to="/map">Karte</NavLink>

        <NavLink to="/weather">Wetter</NavLink>

        <NavLink to="account">Account</NavLink>
      </AppNavbar>
    </Footer>
  );
}

const Footer = styled.footer`
  background-color: var(--color-four);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: fixed;
  height: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const AppNavbar = styled.nav`
  color: var(--color-one);
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-basis: 100%;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;

  a {
    color: var(--color-one);
    flex-grow: 1;
    padding: 1rem 0 1rem 0;
    text-align: center;
    text-decoration: none;
  }

  .active {
    animation: active-nav 0.3s linear;
    animation-fill-mode: forwards;
    color: var(--color-five);
    background-color: var(--color-three);

    @keyframes active-nav {
    0% {
    border-radius: 0;
    font-size: 1rem;
    padding-bottom: 1rem;
    }
    100% {

    border-radius: 0.3rem 0.3rem 0 0;
    font-size: 1.2rem;
    padding-bottom: 2rem;
    }
 }
}
`;
