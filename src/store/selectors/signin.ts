// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Create selectors for variables which exists in SignInSlice.
 */

// External imports
import { createSelector } from '@reduxjs/toolkit';

// Application's imports
import { RootState } from 'store/slices';

export const selectSignInUserData = (state: RootState) => state.signIn.user;

export const selectSignInLoggedIn = (state: RootState) => state.signIn.loggedIn;

export const selectSignInInvalidFields = (state: RootState) => state.signIn.invalidFields;

export const selectSignInInvalidFieldsMessages = (state: RootState) => state.signIn.invalidFieldsMessages;

export const selectSignInLoading = (state: RootState) => state.signIn.loading;

export const selectSignInIsInvalidCredentials = createSelector(
    selectSignInInvalidFields,
    (invalidFields) =>
        Object
            .values(invalidFields)
            .some(value => value === true),
);
