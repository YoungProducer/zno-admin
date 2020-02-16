import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// Application's imports
import theme from './theme';
import store from './store';
import App from "./containers/AppContainer";

import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={500}
            >
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    rootElement,
);
