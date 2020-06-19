/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Slice which handle all erros in async action creators.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

/** Application's imports */

/** Declare interfaces for actions and payloads */
export namespace ErrorHandler {
    export interface SetPayload {
        message: string;
        status: string;
        statusCode: number;
        data?: any;
    }

    export interface State {
        /** Error message */
        message?: string;
        /** Error status */
        status?: string;
        /** Error status code */
        statusCode?: number;
        /** Any additional data */
        data?: any;
    }
}

/** Create initial state */
const initialState: ErrorHandler.State = {};

/** Create slice */
const errorHandler = createSlice({
    initialState,
    name: 'ErrorHandler',
    reducers: {
        setErrorAction: {
            reducer: (
                state: ErrorHandler.State,
                { payload }: PayloadAction<ErrorHandler.SetPayload>,
            ) => ({
                ...state,
                ...payload,
            }),
            prepare: (error?: AxiosError): Omit<PayloadAction<ErrorHandler.SetPayload>, 'type'> => ({
                payload: error
                    ? {
                        message: error.message,
                        status: error?.response?.statusText,
                        statusCode: error?.response?.status,
                    }
                    : {
                        message: '',
                        status: '',
                        statusCode: 200,
                        data: null,
                    },
            }),
        },
    },
});

/** Export actions */
export const {
    setErrorAction,
} = errorHandler.actions;

/** Export reducer */
export default errorHandler.reducer;
