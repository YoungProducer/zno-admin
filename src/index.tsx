import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// Application's imports
import theme from './theme';
import store from './store';
import App from './App';
import Notifier from 'components/Notifier';

import 'styles/index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={1500}
            >
                <Notifier />
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    rootElement,
);
