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

.inner-form-container {
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 1rem;
  padding: 0.3rem;
}

.outer-form-container {
  background-color: var(--color-five);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: fixed;
  inset: 2rem;
  z-index: 15;
  .fade-in-1sec {
  animation: fadein1sec 1sec linear;
  animation-fill-mode: forwards;

  @keyframes fadein1sec {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
   }
}

.fade-out-5sec {
  animation: fadeout5sec 5sec linear;
  animation-fill-mode: forwards;

  @keyframes fadeout5sec {
    0% {
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
   }
}
}

`;
export default GlobalStyle;
