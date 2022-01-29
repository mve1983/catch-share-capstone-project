import styled from "styled-components";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null)


  useEffect(() => {
    const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(getUserInfo)
  }, []);

  async function submitHandler(event) {
    event.preventDefault();
    setError("");

    setLoading(true);
    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const resultJson = await result.json();

    if (!result.ok) {
      setError(resultJson.message);
    } else {
      localStorage.setItem("userInfo", JSON.stringify(resultJson));
    }
    setLoading(false);
  }

  return (
    <>
      {error && <ErrorDiv>{error}</ErrorDiv>}
      {userInfo && <Navigate to="/" /> }
      <section>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">
            <input
              type="text"
              name="e-mail"
              id="e-mail"
              value={email}
              placeholder="E-Mail..."
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label htmlFor="password">
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              placeholder="Passwort..."
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button onClick={submitHandler}>Hier Klicken</button>
        </form>
      </section>
    </>
  );
}

const ErrorDiv = styled.div`
  color: red;
  background-color: white;
  border-radius: 0.3rem;
`;
