import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import api from '../../middleware/api';

import {
    SUCCESS_ME,
    FAILURE_ME,
    LOADING_ME,
} from '../../actionsTypes/auth/me';

import {
    MeActions,
} from '../../../types/store/actionsCreators/auth/me';

import {
    LoadingCredentials,
    LoadingAction,
    FailureCredentials,
    FailureAction,
} from '../../../types/store/actionsCreators/mainTypes';
import { SuccessSignInCredentials, SuccessSignInAction } from '../../../types/store/actionsCreators';
import { createSuccessSignInAction, createFailureSignInAction, createSetLoggedInAction } from './signin';
import { createFetchRefreshAction } from './refresh';

export const createLoadingMeAction = ({
    loading,
}: LoadingCredentials): LoadingAction => ({
    type: LOADING_ME,
    payload: { loading },
});

export const createFailureMeAction = ({
    error,
}: FailureCredentials): FailureAction => ({
    type: FAILURE_ME,
    payload: { error },
});

export const createFetchMeAction = () => {
    return (dispatch: Dispatch<MeActions | SuccessSignInAction | FailureAction | any>) => {
        dispatch(createLoadingMeAction({ loading: true }));

        api.me()
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(createLoadingMeAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data)
            .then((credentials: SuccessSignInCredentials) => {
                dispatch(createSuccessSignInAction(credentials));
                dispatch(createSetLoggedInAction({ loggedIn: true }));
            })
            .catch((error: AxiosError) => {
                dispatch(createLoadingMeAction({ loading: false }));
                dispatch(createFailureMeAction({ error }));
                dispatch(createFetchRefreshAction());
            });
    };
};
