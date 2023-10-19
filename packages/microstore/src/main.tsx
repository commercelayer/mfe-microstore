import React from "react"
import { createRoot } from "react-dom/client"

import "#styles/globals.css"
import "#providers/i18n"
import App from "./App"

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container) // createRoot(container!) if you use TypeScript
  root.render(<App />)
}
