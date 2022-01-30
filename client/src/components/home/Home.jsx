import { useState } from "react";
import styled from "styled-components";
import background from "../../img/background.jpg";
import Login from "./Login";
import Register from "./Register";

export default function Home({ userInfo, initialUser, onHandleInputChange, onGetUserInfo }) {

  const [registerClicked, setRegisterClicked] = useState(false)


  const [error, setError] = useState("");



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
    registerSetter()

    if (initialUser.password !== initialUser.confirmPassword)
      setError("Passwörter müssen gleich sein!");

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
    }
  }

  return (
    <>
      <BackgroundImage />
      <HomeWrapper>
        <section>
          <h2>Willkommen {userInfo ? userInfo.name : "Fremder"}!</h2>
          <div></div>
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
              <div>
                AhhGanz neu, bitte registriere dich und wähle einen Usernamen.
              </div>
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
              Schön, dass du da bist, siehe dir die drei neuesten
              Fangmeldungen an.
            </div>
          )}
        </section>
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.section`
  margin: 7rem 1rem 1rem 1rem;
  text-align: center;
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
