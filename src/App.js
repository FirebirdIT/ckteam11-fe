import Route from "./router/route";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
  const newTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#D5165B",
      },
      // secondary: {
      //   main: yellow[600],
      // },
      // warning: {
      //   main: red[900],
      // },
    },
  });
  return (
    <ThemeProvider theme={newTheme}>
      <Route />
    </ThemeProvider>
  );
}

export default App;
