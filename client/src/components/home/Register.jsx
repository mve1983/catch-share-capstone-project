import styled from "styled-components";


export default function Register({ initialUser, error, onChange, onSubmitRegister }) {


  return (
    <>
      {error && <ErrorDiv>{error}</ErrorDiv>}
       <section>
        <form onSubmit={onSubmitRegister}>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              value={initialUser.name}
              placeholder="Username..."
              onChange={(event) => onChange("name", event.target.value)}
            />
          </label>

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
          <label htmlFor="confirmpasword">
            <input
              type="password"
              name="confirmpasword"
              id="confirmpasword"
              value={initialUser.ConfirmPassword}
              placeholder="Passwort bestätigen..."
              onChange={(event) => onChange("confirmPassword", event.target.value)}
            />
          </label>
          <button onClick={onSubmitRegister}>Registrieren</button>
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
