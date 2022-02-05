import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  transition: transitions.SCALE,
  position: positions.BOTTOM_CENTER,
};

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
