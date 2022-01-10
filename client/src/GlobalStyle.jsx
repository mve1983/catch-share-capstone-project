import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
  --background-one: beige;
  --background-two: steelblue;

  --color-one: darkred;
  --color-two: darkorange
}

body {
  margin: 0;
  padding: 0;
  background: var(--background-one);
  font-family: Open-Sans, Helvetica, Sans-Serif;
}

h1 {
margin: 0;
padding: 0.3rem 0 0.3rem 0;
text-shadow: -1px -1px 0 var(--color-two),
    1px -1px 0 var(--color-two), -1px 1px 0 var(--color-two),
    1px 1px 0 var(--color-two);
}


`;

export default GlobalStyle;
