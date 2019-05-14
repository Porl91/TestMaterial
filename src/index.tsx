import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMuiTheme, Drawer, IconButton, Divider, List, ListItem, ListItemText, CssBaseline } from "@material-ui/core";
import BootstrapPage from "./components/Bootstrap";
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
       useNextVariants: true
    },
    palette: {
        type: 'light'
    }, 
    spacing: {
        unit: 16
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BootstrapPage />
    </MuiThemeProvider>,
    document.getElementById("example")
);