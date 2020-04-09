/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Middleware which handles error from async action creators
 * if error has status 401 automaticaly logout user.
 */

/** External imports */
import { Dispatch, AnyAction, ActionCreator, Middleware, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import { ErrorHandler } from 'store/slices/errorHandler';
import {
    setUserDataAction,
} from 'store/slices/auth';

export const errorHandler: Middleware = (store) => (next) => async (action) => {
    /** Invoke next action in the middleware chain */
    next(action);

    /** Extract data from action */
    const { type, payload } = action as PayloadAction<ErrorHandler.SetPayload>;

    if (type === 'ErrorHandler/setErrorAction') {
        const { statusCode } = payload;

        if (statusCode === 401) {
            store.dispatch(setUserDataAction(null));
        }
    }
};
