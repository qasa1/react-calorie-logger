import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#651fff"
    },
    secondary: deepPurple
  },
  typography: {
    fontFamily: ["Franklin Gothic Medium"].join(",")
  }
});

theme = responsiveFontSizes(theme);

export default theme;
