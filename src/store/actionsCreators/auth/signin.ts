import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

// Custom imports
import api from '../../middleware/api';
import {
    FETCH_SIGNIN,
    SUCCESS_SIGNIN,
    FAILURE_SIGNIN,
    LOADING_SIGNIN,
    SET_LOGGEDIN,
    SET_USER_DATA,
} from '../../actionsTypes/auth/signin';
import {
    FetchSignInCredentials,
    FetchSignInAction,
    SuccessSignInCredentials,
    SuccessSignInAction,
    SigninActions,
    SetLoggedInCredentials,
    SetLoggedInAction,
    SetUserDataCredentials,
    SetUserDataAction,
} from '../../../types/store/actionsCreators';

import {
    FailureCredentials,
    FailureAction,
    LoadingCredentials,
    LoadingAction,
} from '../../../types/store/actionsCreators/mainTypes';

export const createSuccessSignInAction = ({
    id,
    email,
    userName,
    role,
}: SuccessSignInCredentials): SuccessSignInAction => ({
    type: SUCCESS_SIGNIN,
    payload: { id, email, userName, role },
});

export const createFailureSignInAction = ({
    error,
}: FailureCredentials): FailureAction => ({
    type: FAILURE_SIGNIN,
    payload: { error },
});

export const createLoadingSignInAction = ({
    loading,
}: LoadingCredentials): LoadingAction => ({
    type: LOADING_SIGNIN,
    payload: { loading },
});

export const createSetLoggedInAction = ({ loggedIn }: SetLoggedInCredentials): SetLoggedInAction => ({
    type: SET_LOGGEDIN,
    payload: { loggedIn },
});

export const createSetUserDataAction = ({ email, userName }: SetUserDataCredentials): SetUserDataAction => ({
    type: SET_USER_DATA,
    payload: { email, userName },
});

export const createFetchSignInAction = ({
    email,
    password,
}: FetchSignInCredentials) => {
    return (dispatch: Dispatch<SigninActions>) => {
        dispatch(createLoadingSignInAction({ loading: true }));

        api.signIn({ email, password })
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(createLoadingSignInAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data)
            .then((userData: SuccessSignInCredentials) => {
                dispatch(createSuccessSignInAction({ ...userData }));
                dispatch(createSetLoggedInAction({ loggedIn: true }));
            })
            .catch((error: AxiosError) => dispatch(createFailureSignInAction({ error })));
    };
};
