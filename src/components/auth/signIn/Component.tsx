import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import isemail from 'isemail';

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

const SignInModal = ({ signIn, loading, userEmail }: ISignIn) => {
    const clasess = useStyles();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [invalidFields, setInvalidFields] = useState<boolean>(false);
    const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

    const [emailInvalidMessage, setEmailInvalidMessage] = useState<string>('');
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState<string>('Password must be minimum 8 chars.');

    useEffect(() => {
        setEmail(userEmail || '');
    },        [userEmail]);

    const send = () => {
        if (!isemail.validate(email)) {
            setEmailInvalid(true);
            setEmailInvalidMessage('Invalid email pattern!');
            setInvalidFields(true);
        }
        if (password.length < 8) {
            setPasswordInvalid(true);
            setPasswordInvalidMessage('To short password');
            setInvalidFields(true);
        }

        if (!invalidFields) {
            signIn({ email, password });
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
                Sign In
            </Typography>
            <TextField
                value={email}
                onChange={event => {
                    setEmail(event.target.value);
                    setEmailInvalid(false);
                    setEmailInvalidMessage('');
                    setInvalidFields(false);
                }}
                type="email"
                label="Email"
                color="primary"
                variant="standard"
                error={emailInvalid}
                helperText={emailInvalidMessage}
                className={clasess.textField}
            />
            <TextField
                value={password}
                onChange={event => {
                    setPassword(event.target.value);
                    setPasswordInvalid(false);
                    setPasswordInvalidMessage('Password must be minimum 8 chars.');
                    setInvalidFields(false);
                }}
                type="password"
                label="Password"
                color="primary"
                variant="standard"
                error={passwordInvalid}
                helperText={passwordInvalidMessage}
                className={clasess.textField}
            />
            <Button
                disabled={loading}
                variant={loading ? 'outlined' : 'contained'}
                className={clasess.button}
                color="primary"
                onClick={send}
            >
                Sign In
                {loading && <CircularProgress
                    className={clasess.circularProgress}
                    color="primary"
                    size="30px"
                />}
            </Button>
            <Typography
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
            </Typography>
        </div>
    );
};

export default SignInModal;
