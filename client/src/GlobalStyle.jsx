import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
--color-one: #444444;
--color-two: #f2f2f2;
--color-three: #406b5f;
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-one);
  color: var(--color-two);
  font-family: Open-Sans, Helvetica, Sans-Serif;
}

h1 {
margin: 0;
padding: 0.3rem 0 0.3rem 0;
text-shadow: -1px -1px 0 var(--color-one),
    1px -1px 0 var(--color-one), -1px 1px 0 var(--color-one),
    1px 1px 0 var(--color-one);
}

input:focus {
  outline: none;
}
`;

export default GlobalStyle;