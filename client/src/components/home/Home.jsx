import { useEffect, useState } from "react";
import styled from "styled-components";
import background from "../../img/background.jpg";
import Login from "./Login";
import Register from "./Register";
import CatchCard from "../catchCardForm/CatchCard";
import { checkRegisterForm } from "../../lib/userRegisterValidation";
import { fetchThreeNewestCatchCards } from "../../lib/fetchesMongodb";

export default function Home({
  userInfo,
  initialUser,
  onHandleInputChange,
  onGetUserInfo,
}) {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [error, setError] = useState("");
  const [threeNewestCatches, setThreeNewestCatches] = useState([]);

  useEffect(() => {
    fetchThreeNewestCatchCards().then((data) =>
      setThreeNewestCatches([...data])
    );
  }, []);

  function registerSetter() {
    setRegisterClicked(!registerClicked);
  }

  async function submitHandlerLogin(event) {
    event.preventDefault();
    setError("");

    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: initialUser.email,
        password: initialUser.password,
      }),
    });
    const resultJson = await result.json();

    if (!result.ok) {
      setError(resultJson.message);
    } else {
      localStorage.setItem("__CandSUserInfo__", JSON.stringify(resultJson));
      onGetUserInfo();
    }
  }

  async function submitHandlerRegister(event) {
    event.preventDefault();
    setError("");

    const formValidated = checkRegisterForm(
      initialUser.name,
      initialUser.email,
      initialUser.password,
      initialUser.confirmPassword
    );

    if (!formValidated[0]) return setError(formValidated[1]);

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: initialUser.name,
        email: initialUser.email,
        password: initialUser.password,
        confirmPassword: initialUser.confirmPassword,
      }),
    });
    const resultJson = await result.json();

    if (!result.ok) {
      setError(resultJson.message);
    } else {
      localStorage.setItem("__CandSUserInfo__", JSON.stringify(resultJson));
      onGetUserInfo();
      registerSetter();
    }
  }

  return (
    <>
      <BackgroundImage />
      <HomeWrapper>
        <section>
          <h2>Willkommen {userInfo ? userInfo.name : ""}!</h2>

          {!userInfo && !registerClicked && (
            <>
              <div>
                Catch & Share ist eine App für Hobbyangler um ihre Fangmeldungen
                auf einer interaktiven Karte zu teilen.
                <br />
                Bitte logge dich ein oder registriere dich um fortzufahren.
              </div>
              <Login
                initialUser={initialUser}
                error={error}
                onChange={onHandleInputChange}
                onSubmitLogin={submitHandlerLogin}
              />
              <button onClick={registerSetter}>Registrieren</button>
            </>
          )}

          {registerClicked && !userInfo && (
            <>
              <div>Bitte registriere dich und wähle einen Usernamen.</div>
              <Register
                initialUser={initialUser}
                error={error}
                onChange={onHandleInputChange}
                onSubmitRegister={submitHandlerRegister}
              />
              <button onClick={registerSetter}>Zurück zum Login</button>
            </>
          )}

          {userInfo && (
            <div>
              Schön, dass du da bist, siehe dir die drei neuesten Fangmeldungen
              an.
            </div>
          )}
        </section>
      </HomeWrapper>
      {userInfo && <CatchCard catchCards={threeNewestCatches} />}
    </>
  );
}

const HomeWrapper = styled.section`
  margin: 7rem 1rem 1rem 1rem;
  text-align: center;
  position: relative;
  z-index: 5;

  button {
    background-color: var(--color-five);
    border: none;
    border-radius: 0.3rem;
    box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
    color: var(--color-three);
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    outline: none;
  }
`;

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 75%;
  position: fixed;
  inset: 0;
  z-index: -15;
`;
