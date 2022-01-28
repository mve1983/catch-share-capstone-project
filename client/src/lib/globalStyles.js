import { createGlobalStyle } from "styled-components";

const globalStyles = createGlobalStyle`

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
--color-shadow: black;
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-one);
  color: var(--color-three);
  font-family: 'Titillium Web', sans-serif;
}

button:disabled{
  background-color: var(--color-one);
  color: var(--color-four);
  opacity: 50%;
}

h1 {
  color: var(--color-five);
  margin: 0;
  padding: 0.3rem 0 0.3rem 0;
}

input,
select {
  border: none;
  outline: none;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  background-color: var(--color-four);
  color: var(--color-one);
}

.weather-page-button-normal {
  background-color: var(--color-four);
  color: var(--color-one);
  border: none;
  border-radius: 0.3rem;
  outline: none;
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  margin: 0.2rem 0.3rem;
  padding: 0.3rem 0.3rem;
}

.weather-page-button-active {
  background-color: var(--color-five);
  color: var(--color-four); 
}

.form-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  align-items: center;
  gap: 0.3rem;
  margin: 1.2rem 0.5rem 1.2rem 0.5rem; 
}

.form-border-transparent {
  display: block;
  background-color: var(--color-one);
  position: fixed;
  inset: 0rem;
  opacity: 70%;
  z-index: 12;
}

.inner-form-container {
  border-radius: 0.3rem;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0.5rem;
  padding: 0.3rem;
}

.outer-form-container {
  background: linear-gradient(-45deg,var(--color-four), var(--color-five));
  box-shadow: 0.2rem 0.1rem 0.1rem var(--color-shadow);
  inset: 2rem;
  border-radius: 0.3rem;
  display: block;
  position: fixed;
  z-index: 15;
}

.fade-in-1sec {
  animation: fadein1sec 1s ease-in-out;
  animation-fill-mode: forwards;
}

.fade-out-1sec {
  animation: fadeout1sec 1s ease-in-out;
  animation-fill-mode: forwards;
}

.fade-in-after-half-time {
  animation: fadeoutafterhalf 3s ease-in-out;
  animation-fill-mode: forwards;
}

.fade-in-nav {
  animation: opennav 0.4s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes fadein1sec {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@keyframes fadeout1sec {
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
}

@keyframes fadeoutafterhalf {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%
  }
}

@keyframes opennav {
  0% {
    display: initial;
    color: transparent;
    width: 0rem;
  }
  90% {
    color: transparent;
  }
  100% {
    color: var(--color-one);
    width: 8rem;
  }
}


`;
export default globalStyles;
