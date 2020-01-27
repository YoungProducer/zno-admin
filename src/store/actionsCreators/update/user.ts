import { Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import {
    FAILURE_USER,
    LOADING_USER,
} from '../../actionsTypes/update/user';
import { FailureCredentials, FailureAction, LoadingCredentials, LoadingAction } from '../../../types/store/actionsCreators/mainTypes';
import { FetchUserCredentials, UpdateUserActions } from '../../../types/store/actionsCreators/update/user';
import api from '../../middleware/api';
import { SetUserDataCredentials, SetUserDataAction } from '../../../types/store/actionsCreators';
import { createSetUserDataAction } from '../auth/signin';

export const createFailureUserAction = ({ error }: FailureCredentials): FailureAction => ({
    type: FAILURE_USER,
    payload: { error },
});

export const createLoadingUserAction = ({ loading }: LoadingCredentials): LoadingAction => ({
    type: LOADING_USER,
    payload: { loading },
});

export const createFetchUserAction = (credentials: FetchUserCredentials) =>
    (dispatch: Dispatch<UpdateUserActions | SetUserDataAction>) => {
        dispatch(createLoadingUserAction({ loading: true }));

        api.updateUser(credentials)
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                dispatch(createLoadingUserAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data)
            .then((userProfile: SetUserDataCredentials) => dispatch(createSetUserDataAction(userProfile)))
            .catch((error: AxiosError) => dispatch(createFailureUserAction({ error })));
    };
