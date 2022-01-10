import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
  --background-one: teal;
  --background-two: lightgrey;

  --color-one: orange;
}

body {
  margin: 0;
  padding: 0;
  background: var(--background-one);
  font-family: Open-Sans, Helvetica, Sans-Serif;
}

h1 {
margin: 0;
}


`;

export default GlobalStyle;
