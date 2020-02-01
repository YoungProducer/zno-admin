import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

// Application's imports
import theme from './theme';
import store from './store';
import App from "./containers/AppContainer";

import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    rootElement,
);