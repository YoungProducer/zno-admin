import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4A8FE7',
            main: '#5B79FF',
            dark: '#4264FF',
            contrastText: '#fff',
        },
        secondary: {
            light: '#47F7E5',
            main: '#44E5E7',
            dark: '#3ED3D6',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiInputBase: {
            root: {
                width: 240,
                color: '#333',
            },
        },
        MuiFormHelperText: {
            root: {
                fontSize: '0.9rem',
            },
        },
    },
    typography: {
        h5: {
            fontSize: '1rem',
        },
        fontFamily: 'ProductSans-Light, Arial',
    },
});

export default theme;
