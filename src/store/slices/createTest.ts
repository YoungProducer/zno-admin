/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 March 2020
 *
 * Slice which handles test creating.
 * In general - loading and error handling.
 * Main functionality happens in async action(thunk).
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import { StateWithLoading, LoadingPayload } from './types';

export namespace CreateTestSlice {
    export interface State extends StateWithLoading {}
}

const initialState: CreateTestSlice.State = {
    loading: false,
};

const createTest = createSlice({
    initialState,
    name: 'CreateTest',
    reducers: {
        setCreateTestLoadingAction: (
            state: CreateTestSlice.State,
            { payload }: PayloadAction<LoadingPayload>,
        ) => ({
            ...state,
            loading: payload,
        }),
    },
});

/** Export actions */
export const {
    setCreateTestLoadingAction,
} = createTest.actions;

/** Export reducer */
export default createTest.reducer;
