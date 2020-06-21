/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 April 2020
 *
 * Async action creator which makes api request
 * to logout endpoint.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

/** Application's imports */
import { ThunkExtraArgument } from 'store';
import { RootState } from 'store/slices';
import { setLogoutLoadingAction, setUserDataAction, deleteUserDataAction, setLoggedIn } from 'store/slices/auth';
import { setErrorAction } from 'store/slices/errorHandler';

export const logoutAction = () =>
    async (dispatch: Dispatch<any>, getState: () => RootState, extra: ThunkExtraArgument) => {
        dispatch(setLogoutLoadingAction(true));

        const { api } = extra;

        return api.logout()
            .then(response => {
                dispatch(setLogoutLoadingAction(false));
                dispatch(deleteUserDataAction());
                // dispatch(setLoggedIn(false));
            })
            .catch((error: AxiosError) => {
                setLogoutLoadingAction(false);
                dispatch(setErrorAction(error));
            });
    };
