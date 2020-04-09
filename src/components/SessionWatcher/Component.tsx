/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Component which check is user already logged in.
 */

/** External imports */
import React, { useEffect } from 'react';

/** Application's imports */
import { SessionWatcherProps } from './container';

const Component = ({
    fetchMe,
}: SessionWatcherProps): null => {

    useEffect(() => {
        fetchMe();
    }, []);

    return null;
};

export default Component;
