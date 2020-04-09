/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Slice which handles 'logout' request.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import { LoadingPayload, StateWithLoading } from '../types';

export namespace LogoutSlice {
    export interface State extends StateWithLoading {}
}

const initialState: LogoutSlice.State = {
    loading: false,
};

const me = createSlice({
    initialState,
    name: 'Logout',
    reducers: {
        setLogoutLoadingAction: (
            state: LogoutSlice.State,
            { payload }: PayloadAction<LoadingPayload>,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

export const {
    setLogoutLoadingAction,
} = me.actions;

export default me.reducer;
