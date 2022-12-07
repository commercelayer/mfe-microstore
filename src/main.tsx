import React from "react"
import { render } from "react-dom"

import "#styles/globals.css"
import App from "./App"

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
)
