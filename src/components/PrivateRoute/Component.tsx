// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Permission route which automaticaly redirect from protected pages if user is not logged in to SignIn page.
 */

// External imports
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Application's imports
import { TPrivateRoute } from './container';

const Component = ({ loggedIn, children, ...rest }: TPrivateRoute) => (
    <Route
        {...rest}
        render={({ location }) =>
            loggedIn
                ? children
                : <Redirect
                    to={{
                        pathname: '/auth/signin',
                        state: { from: location },
                    }}
                />
        }
    />
);

export default Component;
