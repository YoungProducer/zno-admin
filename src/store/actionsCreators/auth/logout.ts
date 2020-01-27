import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import { LOADING_LOGOUT, FAILURE_LOGOUT } from '../../actionsTypes/auth/logout';
import { FailureCredentials, FailureAction, LoadingCredentials, LoadingAction } from '../../../types/store/actionsCreators/mainTypes';
import { LogoutActions } from '../../../types/store/actionsCreators/auth/logout';
import api from '../../middleware/api';
import { createSetLoggedInAction } from './signin';

export const createLoadingLogoutAction = ({ loading }: LoadingCredentials): LoadingAction => ({
    type: LOADING_LOGOUT,
    payload: { loading },
});

export const createFailureLogoutAction = ({ error }: FailureCredentials): FailureAction => ({
    type: FAILURE_LOGOUT,
    payload: { error },
});

export const createFetchLogoutAction = () =>
    (dispatch: Dispatch<LogoutActions>) => {
        dispatch(createLoadingLogoutAction({ loading: true }));

        api.logout()
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(createLoadingLogoutAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => dispatch(createSetLoggedInAction({ loggedIn: false })))
            .catch((error: AxiosError) => dispatch(createFailureLogoutAction({ error })));
    };
