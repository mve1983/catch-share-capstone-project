import styled from "styled-components";


export default function Login({ initialUser, error, onChange, onSubmitLogin }) {

  return (
    <>
      {error && <ErrorDiv>{error}</ErrorDiv>}
       <section>
        <form onSubmit={onSubmitLogin}>
          <label htmlFor="email">
            <input
              type="text"
              name="email"
              id="email"
              value={initialUser.email}
              placeholder="E-Mail..."
              onChange={(event) => onChange("email", event.target.value)}
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={initialUser.password}
              placeholder="Passwort..."
              onChange={(event) => onChange("password", event.target.value)}
            />
          </label>
          <button onClick={onSubmitLogin}>Einloggen</button>
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
