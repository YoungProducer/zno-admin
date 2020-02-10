/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 10 February 2020
 *
 * This slice handle sending array of tasks to server.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ILoadingAction } from 'store/slices/types';

/**
 * SetCreateTestErrorMessage
 */
interface ISetCreateTestErrorMessage {
    payload: string;
}

export interface ICreateTestInitialState {
    loading: boolean;
    errorMessage: string;
}

const initialState: ICreateTestInitialState = {
    loading: false,
    errorMessage: '',
};

const createTestSlice = createSlice({
    initialState,
    name: 'CreateTest',
    reducers: {
        loadingCreateTestAction: (
            state: ICreateTestInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        setCreateTestErrorMessageAction: (
            state: ICreateTestInitialState,
            { payload }: ISetCreateTestErrorMessage,
        ) => ({
            ...state,
            errorMessage: payload,
        }),
    },
});

export const {
    loadingCreateTestAction,
    setCreateTestErrorMessageAction,
} = createTestSlice.actions;

export default createTestSlice.reducer;
