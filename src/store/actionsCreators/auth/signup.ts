import { Dispatch } from 'redux';

// Custom imports

// Api
import api from '../../middleware/api';

// Action types
import {
    FETCH_SIGNUP,
    SUCCESS_SIGNUP,
    FAILURE_SIGNUP,
    LOADING_SIGNUP,
} from '../../actionsTypes/auth/signup';

// Credentials and Actions interfaces
import {
    FetchSignUpCredentials,
    FetchSignUpAction,
    SuccessSignUpCredentials,
    SuccessSignUpAction,
    SignUpActions,
} from '../../../types/store/actionsCreators/auth/signup';

import {
    FailureCredentials,
    FailureAction,
    LoadingCredentials,
    LoadingAction,
} from '../../../types/store/actionsCreators/mainTypes';

import { AxiosResponse, AxiosError } from 'axios';

export const createSuccessSignUpAction = ({
    email,
}: SuccessSignUpCredentials): SuccessSignUpAction => ({
    type: SUCCESS_SIGNUP,
    payload: { email },
});

export const createFailureSignUpAction = ({
    error,
}: FailureCredentials): FailureAction => ({
    type: FAILURE_SIGNUP,
    payload: { error },
});

export const createLoadingSignUpAction = ({
    loading,
}: LoadingCredentials): LoadingAction => ({
    type: LOADING_SIGNUP,
    payload: { loading },
});

export const createFetchSignUpAction = ({
    email,
    password,
    userName,
}: FetchSignUpCredentials) => {
    return (dispatch: Dispatch<SignUpActions>) => {
        dispatch(createLoadingSignUpAction({ loading: true }));

        api.signUp({ email, password, userName })
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(createLoadingSignUpAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data.email)
            .then((email: string) => dispatch(createSuccessSignUpAction({ email })))
            .catch((error: AxiosError) => dispatch(createFailureSignUpAction({ error })));
    };
};
