// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 *  Async action which create call to api
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';
import isemail from 'isemail';

// Application's imports
import api from 'api';
import { ISignInCredentials } from 'api/types';
import {
    setUserDataAction,
    setLoggedIn,
    setSignInInvalidFieldsAction,
    setSignInInvalidFieldsMessagesAction,
    loadingSignInAction,
    IUser,
    ISetInvalidFieldsMessagesPayload,
} from 'store/slices/signin';

const validateCredentials = (credentials: ISignInCredentials): [boolean, string[], ISetInvalidFieldsMessagesPayload] => {
    const invalidFields = [];
    const invalidFieldsMessages: ISetInvalidFieldsMessagesPayload = {};

    if (!isemail.validate(credentials.email)) {
        invalidFields.push('email');
        invalidFieldsMessages.email = 'Неправильний шаблон емейлу.' ;
    }
    if (credentials.password.length < 8) {
        invalidFields.push('password');
        invalidFieldsMessages.password = 'Занад-то короткий пароль.';
    }

    const invalid = invalidFields.length !== 0;

    return [invalid, invalidFields, invalidFieldsMessages];
};

export const fetchSignInAction = (credentials: ISignInCredentials) =>
    async (dispatch: Dispatch<any>) => {
        dispatch(loadingSignInAction(true));

        const [invalid, invalidFields, invalidFieldsMessages] = validateCredentials(credentials);

        if (invalid) {
            dispatch(setSignInInvalidFieldsAction(invalidFields));
            dispatch(setSignInInvalidFieldsMessagesAction(invalidFieldsMessages));
            dispatch(loadingSignInAction(false));
        }

        if (!invalid) {
            return api.signIn(credentials)
                .then(response => {
                    if (response.status !== 200) {
                        dispatch(loadingSignInAction(false));
                        throw Error(response.statusText);
                    }

                    dispatch(loadingSignInAction(false));

                    return response.data;
                })
                .then((data: IUser) => {
                    dispatch(setUserDataAction(data));
                    dispatch(setLoggedIn(true));
                })
                .catch(error => {
                    const errorData = error.response.data.error.data;

                    if (Object.keys(error.response.data).some(key => key === 'error')) {
                        dispatch(setSignInInvalidFieldsAction(errorData.invalidFields));
                        dispatch(setSignInInvalidFieldsMessagesAction(errorData.invalidFieldsMessages));
                        dispatch(loadingSignInAction(false));
                    }
                });
        }

    };
