// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

// Slice for user signin

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ILoadingAction } from 'store/slices/types';

export interface ISignInInvalidFields {
    email: boolean;
    password: boolean;
}

export interface ISignInInvalidFieldsMessages {
    email?: string;
    password?: string;
}

export interface IUser {
    id: string;
    email: string;
    role: string;
    userName: string;
}

/**
 * SetUserDataAction
 */
interface ISetUserDataAction {
    payload: IUser;
}

/**
 * SetLoggedInAction
 */
interface ISetLoggedInAction {
    payload: boolean;
}

/**
 * SetInvalidFieldsAction
 */
interface ISetInvalidFieldsAction {
    payload: string[];
}

/**
 * SetInvalidFieldsMessagesAction
 */
export interface ISetInvalidFieldsMessagesPayload {
    [attr: string]: string;
}

interface ISetInvalidFieldsMessagesAction {
    payload: ISetInvalidFieldsMessagesPayload;
}

export interface ISignInInitialState {
    user?: IUser;
    invalidFields: ISignInInvalidFields;
    invalidFieldsMessages: ISignInInvalidFieldsMessages;
    loading: boolean;
    loggedIn: boolean;
}

const defaultInvalidFieldsMessages: ISignInInvalidFieldsMessages = {
    email: '',
    password: 'Мінімум 8 символів.',
};

const initialState: ISignInInitialState = {
    loading: false,
    loggedIn: false,
    invalidFields: {
        email: false,
        password: false,
    },
    invalidFieldsMessages: defaultInvalidFieldsMessages,
};

const signInSlice = createSlice({
    initialState,
    name: 'SignIn',
    reducers: {
        setLoggedIn: (
            state: ISignInInitialState,
            { payload }: ISetLoggedInAction,
        ) => ({
            ...state,
            loggedIn: payload,
        }),
        setUserDataAction: (
            state: ISignInInitialState,
            { payload }: ISetUserDataAction,
        ) => ({
            ...state,
            user: payload,
        }),
        deleteUserDataAction: (
            state: ISignInInitialState,
        ) => ({
            ...state,
            user: null,
        }),
        setSignInInvalidFieldsAction: (
            state: ISignInInitialState,
            { payload }: ISetInvalidFieldsAction,
            ) => {
            const { invalidFields } = state;

            // Create new object which contain invalid fields with value: true
            const newInvalidFields = payload.reduce((acc, curr) => {
                // Check is current value from array exist in state.invalidFields
                if (Object.keys(invalidFields).some(key => key === curr)) {
                    return {
                        ...acc,
                        [curr]: true,
                    };
                }

                return { ...acc };
            },                                      {});

            return {
                ...state,
                invalidFields: Object.assign({ ...invalidFields }, newInvalidFields) as ISignInInvalidFields,
            };
        },
        clearSignInInvalidFieldsAction: (
            state: ISignInInitialState,
        ) => {
            const { invalidFields } = state;

            const newInvalidFields =
                Object
                    .keys(invalidFields)
                    .reduce((acc, curr) => ({
                        ...acc,
                        [curr]: false,
                    }),     {});

            return {
                ...state,
                invalidFields: Object.assign({ ...invalidFields }, newInvalidFields) as ISignInInvalidFields,
            };
        },
        setSignInInvalidFieldsMessagesAction: (
            state: ISignInInitialState,
            { payload }: ISetInvalidFieldsMessagesAction,
        ) => {
            const { invalidFieldsMessages } = state;

            const newInvalidFieldsMessages =
                Object
                    .entries(payload)
                    .reduce((acc, curr) => {
                        if (Object.keys(invalidFieldsMessages).some(key => key === curr[0])) {
                            return {
                                ...acc,
                                [curr[0]]: curr[1],
                            };
                        }

                        return { ...acc };
                    },      {});

            return {
                ...state,
                invalidFieldsMessages: Object.assign({ ...invalidFieldsMessages }, newInvalidFieldsMessages),
            };
        },
        clearSignInInvalidFieldsMessagesAction: (
            state: ISignInInitialState,
        ) => ({
            ...state,
            invalidFieldsMessages: defaultInvalidFieldsMessages,
        }),
        loadingSignInAction: (
            state: ISignInInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

export const {
    setUserDataAction,
    setLoggedIn,
    deleteUserDataAction,
    setSignInInvalidFieldsAction,
    clearSignInInvalidFieldsAction,
    setSignInInvalidFieldsMessagesAction,
    clearSignInInvalidFieldsMessagesAction,
    loadingSignInAction,
} = signInSlice.actions;

export default signInSlice.reducer;
