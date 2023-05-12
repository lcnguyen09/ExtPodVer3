import React from "react"
import ReactDOM from "react-dom/client"
import { ManagedUIContext } from './contexts/ui.context'

import { Provider } from 'react-redux'
import store from './redux/redux'

import App from "./App"
import "./App.scss"

const rootElement = document.createElement("div")
rootElement.id = "podorder-ext-app"
document.body.appendChild(rootElement)
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <ManagedUIContext>
      <Provider store={store}>
        <App />
      </Provider>
    </ManagedUIContext>

  </React.StrictMode>
);