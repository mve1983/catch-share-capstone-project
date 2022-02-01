import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import menu from "../../img/menu.png";
import logged from "../../img/logged.png";
import notlogged from "../../img/notlogged.png";

export default function Navbar({ userInfo, onSetUserBackToInitial, onGetUserInfo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  function menuSetter() {
    setMenuOpen(!menuOpen);
  }

  function logoutSetter() {
    setLogoutOpen(!logoutOpen);
  }

  function logout() {
    localStorage.removeItem("__CandSUserInfo__");
    onSetUserBackToInitial()
  }

  return (
    <>
      <MenuButton>
        <img onClick={menuSetter} src={menu} alt="Menu-Button" />
      </MenuButton>
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

      <LoggedStatus> {!userInfo ? "nicht eingeloggt" : <div>eingeloggt: <br/> {userInfo.name} </div>}</LoggedStatus>
      <LoggedButton onClick={logoutSetter}>
        <img src={userInfo ? logged : notlogged} alt="logged-status" />
      </LoggedButton>
      {userInfo && logoutOpen && (
        <Logout className="fade-in-nav"
          onClick={() => {
            logout();
            logoutSetter();
            onGetUserInfo()
          }}
        >
          Logout
        </Logout>
      )}
    </>
  );
}

const MenuButton = styled.div`
  background-color: var(--color-four);
  border-radius: 0 0 0.3rem 0;
  padding: 0.2rem 0.2rem 0.03rem 0.2rem;
  position: fixed;
  left: 0;
  top: 3.3rem;
  z-index: 10;

  img {
    width: 1.5rem;
  }
`;

const LoggedButton = styled.div`
  background-color: var(--color-four);
  border-radius: 0 0 0 0.3rem;
  padding: 0.2rem 0.2rem 0.03rem 0.2rem;
  position: fixed;
  right: 0;
  top: 3.3rem;
  z-index: 10;

  img {
    width: 1.5rem;
    border: solid 0.1rem transparent;
  }
`;

const Logout = styled.div`
  color: var(--color-one);
  background-color: var(--color-four);
  cursor: pointer;
  border-radius: 0.3rem 0 0 0.3rem;
  padding: 1rem 0.3rem 1rem 0.3rem;
  font-size: 1.2rem;
  font-weight: bold;
  position: fixed;
  right: 0;
top: 5.2rem;
text-align: center;
  z-index: 10;

  :hover {
      background-color: var(--color-three);
    }
`;

const LoggedStatus = styled.div`
  background-color: transparent;
  font-size: 0.6rem;
  font-weight: bold;
  position: fixed;
  right: 2.2rem;
  top: 3.6rem;
  text-align: right;
  text-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  z-index: 10;
`;

const AppNavbar = styled.nav`
  background-color: var(--color-four);
  border-radius: 0 0.3rem 0.3rem 0;
  display: none;
  position: fixed;
  left: 0;
  top: 5.2rem;
  display: flex;
  flex-direction: column;
  z-index: 10;

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
