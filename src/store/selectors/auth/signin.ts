// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Create selectors for variables which exists in SignInSlice.
 */

// External imports
import { createSelector } from '@reduxjs/toolkit';

// Application's imports
import { RootState } from 'store/slices';

export const selectSignInUserData = (state: RootState) => state.auth.signin.user;

export const selectSignInLoggedIn = createSelector(
    selectSignInUserData,
    (user) => user !== null,
);

export const selectSignInInvalidFields = (state: RootState) => state.auth.signin.invalidFields;

export const selectSignInInvalidFieldsMessages = (state: RootState) => state.auth.signin.invalidFieldsMessages;

export const selectSignInLoading = (state: RootState) => state.auth.signin.loading;

export const selectLoggedIn = (state: RootState) =>
    Boolean(state.auth.signin.user) && state.auth.signin.user !== null;

export const selectSignInIsInvalidCredentials = createSelector(
    selectSignInInvalidFields,
    (invalidFields) =>
        Object
            .values(invalidFields)
            .some(value => value === true),
);
