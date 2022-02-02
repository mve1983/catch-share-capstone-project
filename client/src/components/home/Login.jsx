import styled from "styled-components";

export default function Login({ initialUser, error, onChange, onSubmitLogin }) {
  return (
    <>
      <section>
        <LoginForm onSubmit={onSubmitLogin}>
          {error && <ErrorDiv>{error}</ErrorDiv>}
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
        </LoginForm>
      </section>
    </>
  );
}

const ErrorDiv = styled.div`
  color: red;
  background-color: white;
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
`;

const LoginForm = styled.form`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    font-size: 1.1rem;
  }

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
