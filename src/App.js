import Route from "./router/route";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {useEffect} from "react";

function App() {

    const newTheme = createMuiTheme({
        palette: {
            primary: {
                main: "#1BB1A0",
            },
        },
    });
    return (
        <ThemeProvider theme={newTheme}>
            <Route/>
        </ThemeProvider>
    );
}

export default App;
