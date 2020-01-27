import { Dispatch } from 'redux';
import { LoadingAction, LoadingCredentials, SuccessSignInCredentials } from '../../../types/store/actionsCreators';
import { LOADING_REFRESH, FAILURE_REFRESH } from '../../actionsTypes/auth/refresh';
import { RefreshActions } from '../../../types/store/actionsCreators/auth/refresh';
import api from '../../middleware/api';
import { AxiosResponse, AxiosError } from 'axios';
import { createSuccessSignInAction, createFailureSignInAction, createSetLoggedInAction } from './signin';
import { FailureAction, FailureCredentials } from '../../../types/store/actionsCreators/mainTypes';

export const createFailureRefreshAction = ({ error }: FailureCredentials): FailureAction => ({
    type: FAILURE_REFRESH,
    payload: { error },
});

export const createLoadingRefreshAction = ({
    loading,
}: LoadingCredentials): LoadingAction => ({
    type: LOADING_REFRESH,
    payload: { loading },
});

export const createFetchRefreshAction = () =>
    (dispatch: Dispatch<RefreshActions>) => {
        createLoadingRefreshAction({ loading: true });

        api.refresh()
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(createLoadingRefreshAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data)
            .then((credentials: SuccessSignInCredentials) => {
                dispatch(createSuccessSignInAction({ ...credentials }));
                dispatch(createSetLoggedInAction({ loggedIn: true }));
            })
            .catch((error: AxiosError) => {
                dispatch(createFailureRefreshAction({ error }));
                dispatch(createSetLoggedInAction({ loggedIn: false }));
            });
    };
