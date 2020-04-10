/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Component which check is user already logged in.
 */

/** External imports */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/** Application's imports */
import { SessionWatcherProps } from './container';

const Component = ({
    fetchMe,
    loggedIn,
}: SessionWatcherProps) => {
    const history = useHistory();

    useEffect(() => {
        fetchMe();
    }, []);

    useEffect(() => {
        if (loggedIn && history.location.pathname === '/auth/signin') {
            const newUrl = (history.location.state as any).from;
            history.push(newUrl);
        }
    }, [history, loggedIn]);

    return <></>;
};

export default Component;
