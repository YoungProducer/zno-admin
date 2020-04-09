/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Slice which handles 'me' request.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import { LoadingPayload, StateWithLoading } from '../types';

export namespace MeSlice {
    export interface State extends StateWithLoading {}
}

const initialState: MeSlice.State = {
    loading: false,
};

const me = createSlice({
    initialState,
    name: 'Me',
    reducers: {
        setMeLoadingAction: (
            state: MeSlice.State,
            { payload }: PayloadAction<LoadingPayload>,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

export const {
    setMeLoadingAction,
} = me.actions;

export default me.reducer;
