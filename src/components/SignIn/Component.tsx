import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import isemail from 'isemail';

// Application's imports
import { TSignInProps } from './container';

const useStyles = makeStyles((theme: Theme) => createStyles({
    formWrapper: {
        background: '#fff',
        position: 'fixed',
        padding: 15,
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
        boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
        textAlign: 'center',
    },
    textField: {
        marginBottom: 40,
        display: 'block',
        width: 240,
        height: 40,
    },
    title: {
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        width: 200,
    },
    circularProgress: {
        marginLeft: 10,
    },
    redirect: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        display: 'inline-block',
        marginLeft: 5,
    },
}));

interface ISignIn {
    loading: boolean;
    userEmail: string;
    signIn: Function;
}

const SignInModal = ({
    signIn,
    loading,
    isInvalidCredentials,
    invalidFields,
    invalidFieldsMessages,
    clearSignInInvalidFields,
    clearSignInInvalidFieldsMessages,
    // userEmail
}: TSignInProps) => {
    const clasess = useStyles();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    /**
     * Function which clear errors and mark all fields as non-invalid.
     * Added condition to prevent big amount of actions calls.
     */
    const handleClear = () => {
        if (isInvalidCredentials) {
            clearSignInInvalidFields();
            clearSignInInvalidFieldsMessages();
        }
    };

    return (
        <div className={clasess.formWrapper}>
            <Typography
                color="primary"
                variant="h4"
                component="h1"
                className={clasess.title}
            >
                Вхід
            </Typography>
            <TextField
                value={email}
                onChange={event => {
                    setEmail(event.target.value);
                    handleClear();
                }}
                type="email"
                label="Емеїл"
                color="primary"
                variant="standard"
                error={invalidFields.email}
                helperText={invalidFieldsMessages.email}
                className={clasess.textField}
            />
            <TextField
                value={password}
                onChange={event => {
                    setPassword(event.target.value);
                    handleClear();
                }}
                type="password"
                label="Пароль"
                color="primary"
                variant="standard"
                error={invalidFields.password}
                helperText={invalidFieldsMessages.password}
                className={clasess.textField}
            />
            <Button
                disabled={loading}
                disableElevation
                variant={loading ? 'outlined' : 'contained'}
                className={clasess.button}
                color="primary"
                onClick={() => signIn({ email, password })}
            >
                Увійти
                {loading && <CircularProgress
                    className={clasess.circularProgress}
                    color="primary"
                    size="24px"
                />}
            </Button>
            {/* <Typography
                color="primary"
                // variant="h4"
                component="div"
                className={clasess.redirect}
            >
                Don't have an account?
                <NavLink to='/auth/signup'>
                    <Link
                        color="primary"
                        component="p"
                        className={clasess.link}
                    >
                        Sign up!
                    </Link>
                </NavLink>
            </Typography> */}
        </div>
    );
};

export default SignInModal;
