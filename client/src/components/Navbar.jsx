import styled from "styled-components";
import { NavLink } from "react-router-dom";
import menu from "../img/menu.png";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);


  function menuSetter() {
setMenuOpen(!menuOpen)
  }

  return (
    <>
      <MenuButton>
        <img onClick={menuSetter} src={menu} alt="Menu-Button" />
              </MenuButton>
              <LoggedStatus>Logged in als: <br /> TestUser</LoggedStatus>
      {menuOpen && (
        <AppNavbar className="fade-in-nav">
          <NavLink className="fade-in-nav" onClick={menuSetter} to="/">
            Start
          </NavLink>

          <NavLink className="fade-in-nav" onClick={menuSetter} to="/map">
            Karte
          </NavLink>

          <NavLink className="fade-in-nav" onClick={menuSetter} to="/weather">
            Wetter
          </NavLink>

          <NavLink className="fade-in-nav" onClick={menuSetter} to="/account">
            
            Account
          </NavLink>
        </AppNavbar>
      )}
     
        </>
  );
}

const MenuButton = styled.div`
  background-color: var(--color-four);
  border-radius: 0 0 0.3rem 0;
  padding: 0.3rem 0.3rem 0.1rem 0.3rem;
  position: fixed;
  left: 0;
  top: 2.8rem;
  z-index: 10;

  img {
    width: 2rem;
  }
`;

const LoggedStatus = styled.div`
  background-color: transparent;
  font-size: 0.8rem;
  position: fixed;
  right: 0.5rem;
  top: 3.5rem;
  text-align: right;
  z-index: 10;
`;

const AppNavbar = styled.nav`
  background-color: var(--color-four);
  border-radius: 0 0.3rem 0.3rem 0.3rem;
  display: none;
  position: fixed;
  left: 2.5rem;
  top: 3rem;
  display: flex;
  flex-direction: column;
  z-index: 25;

  a {
    display: block;
    border-radius: 0.3rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    color: var(--color-one);
    padding: 1rem 0.3rem 1rem 0.3rem;

    :hover {
      background-color: var(--color-three);
    }
  }
`;
