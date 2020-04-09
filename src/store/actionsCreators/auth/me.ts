/**
 * Created by: Oleksander Bezrukov
 * Creation date: 9 April 2020
 *
 * Create async action which make api call to 'me' in endpoint
 * and then handle response or error.
 */

/** External imports */
import { AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import { Auth } from 'api/types';
import { setUserDataAction } from 'store/slices/auth/signin';
import { setMeLoadingAction } from 'store/slices/auth/me';
import { setErrorAction } from 'store/slices/errorHandler';
import { RootState } from 'store/slices';
import { ThunkExtraArgument } from 'store';

export const fetchMeAction = () =>
    async (
        dispatch: Dispatch<any>,
        _: () => RootState,
        extra: ThunkExtraArgument,
    ) => {
        dispatch(setMeLoadingAction(true));

        const { api } = extra;

        return await api.me()
            .then(response => {
                dispatch(setMeLoadingAction(false));

                return response;
            })
            .then(response => {
                /** Extract user data */
                return response.data;
            })
            .then((user: Auth.User) => dispatch(setUserDataAction(user)))
            .catch((error: AxiosError) => {
                dispatch(setMeLoadingAction(false));
                dispatch(setErrorAction(error));
            });
    };
