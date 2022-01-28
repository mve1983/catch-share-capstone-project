import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const result = await fetch("/api/login", {
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

      localStorage.setItem("userInfo", JSON.stringify(resultJson));
      console.log(resultJson);
      setLoading(false);

      return resultJson;
    } catch (error) {
      setError(error.response.result.message);
    }
  }

  return (
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
  );
}
