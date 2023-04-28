import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "pod-order-react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 30vh;
    background: #ffffff;
    border-top: 1px solid #c2c2c2;
    border-left: 1px solid #c2c2c2;
    z-index: 2147483647;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
