import React, { Component } from "react";
import NavBar from "./Header/NavBar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import "../App.css";
import diet from "../store.js";
import AppProvider from "./AppProvider";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppProvider>
          <NavBar history={diet} />
        </AppProvider>
      </ThemeProvider>
    );
  }
}

export default App;
