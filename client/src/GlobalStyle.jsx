import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
--color-one: #353535;
--color-two: #8B0000;
--color-three: #FFFFFF;
--color-four: #D9D9D9;
--color-five: #284B63;
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-one);
  color: var(--color-three);
  font-family: Courier New, Courier,Lucida Sans Typewriter, Lucida Typewriter, monospace; 
}

h1 {
color: var(--color-five);
margin: 0;
padding: 0.3rem 0 0.3rem 0;
text-shadow: -1px -1px 0 var(--color-three),
    1px -1px 0 var(--color-three), -1px 1px 0 var(--color-three),
    1px 1px 0 var(--color-three);
}

input,
select {
  border: none;
  outline: none;
  background-color: var(--color-four);
  color: var(--color-one);
}

.form-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 0.5rem; 
}

`;

export default GlobalStyle;