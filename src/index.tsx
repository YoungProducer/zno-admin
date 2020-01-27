import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core/styles';

import loggerMiddleware from './store/middleware/loggerMiddleware';
import rootReducer from './store/reducers';
import theme from './theme';
import App from "./containers/AppContainer";
// import App from './App';

import "./index.css";
import axios from "axios";

const rootElement = document.getElementById("root");

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, loggerMiddleware),
));

axios.get('http://localhost:4000/index.txt', { responseType: 'blob' }).then(res => console.log(res)).catch(err => console.log(err));

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    rootElement,
);
