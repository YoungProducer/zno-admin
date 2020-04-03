/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Slice which handle opening and closing of the snackbars.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

// Application's imports
import { IExtend } from 'utils/types';

/**
 * EnqueueSnackbarAction
 */
export interface IEnqueueSnackbarPreparePayload {
    message: string;
    options: OptionsObject;
}

interface IEnqueueSnackbarAction {
    payload: IEnqueueSnackbarPreparePayload;
}

/**
 * CloseSnackbarAction
 */
export interface ICloseSnackbarPreparePayload {
    key?: number | string;
}

export interface ICloseSnackbarPayload {
    dismisAll: boolean;
    key: number | string;
}

interface ICloseSnackbarAction {
    payload: ICloseSnackbarPayload;
}

/**
 * RemoveSnackbarAction
 */
interface IRemoveSnackbarAction {
    payload: number | string;
}

export interface INotification {
    options: OptionsObject;
    dismissed?: boolean;
    message: string;
    key: string | number;
}

export interface INotifierState {
    notifications: INotification[];
}

const initialState: INotifierState = {
    notifications: [],
};

const notifierSlice = createSlice({
    initialState,
    name: 'Notifier',
    reducers: {
        enqueueSnackbarAction: {
            reducer: (
                state: INotifierState,
                { payload }: IEnqueueSnackbarAction,
            ) => ({
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: payload.options.key,
                        options: payload.options,
                        message: payload.message,
                    },
                ],
            }),
            prepare: (payload: IEnqueueSnackbarPreparePayload) => {
                const key = payload.options.key;

                return {
                    payload: {
                        message: payload.message,
                        options: {
                            ...payload.options,
                            key: key || new Date().getTime() + Math.random(),
                        },
                    },
                };
            },
        },
        closeSnackbarAction: {
            reducer: (
                state: INotifierState,
                { payload }: ICloseSnackbarAction,
            ) => ({
                ...state,
                notifications: state.notifications.map(
                    (notification: INotification) =>
                    (
                        (payload.dismisAll || notification.key === payload.key)
                            ? { ...notification, dismissed: true }
                            : { ...notification }
                    )),
            }),
            prepare: (
                payload?: string | number,
            ) => ({
                payload: {
                    key: payload,
                    dismisAll: !payload,
                },
            }),
        },
        removeSnackbarAction: (
            state: INotifierState,
            { payload }: IRemoveSnackbarAction,
        ) => ({
            ...state,
            notifications: state.notifications.filter(
                notification => notification.key !== payload,
            ),
        }),
    },
});

export const {
    enqueueSnackbarAction,
    closeSnackbarAction,
    removeSnackbarAction,
} = notifierSlice.actions;

export default notifierSlice.reducer;
