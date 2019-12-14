import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"
import { teal, pink } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secundary: pink
  },
  typography: {
    root: {
      textTransform: "none"
    }
  }
})

console.log(teal)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
)
