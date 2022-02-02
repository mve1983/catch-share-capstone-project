import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./lib/globalStyles";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
