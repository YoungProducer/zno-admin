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
import { SubjectConfigSlice } from './subjectConfig';
import {
    StateWithLoading,
    LoadingPayload,
    ErrorFields,
    ErrorMessages,
    Errors,
} from './types';

export namespace CreateTestSlice {
    export type SubjectConfigErrors = Errors<SubjectConfigSlice.MainFields>;

    export interface TasksListErrors {
        invalidTasks: number[];
    }

    export type SetSubjectConfigErrorsPayload = {
        fields?: string[];
        messages?: ErrorMessages<SubjectConfigSlice.MainFields>;
    };

    export interface State extends StateWithLoading {
        subjectConfigErrors: Partial<SubjectConfigErrors>;
        tasksListErrors: TasksListErrors;
    }
}

const defaultSubjectConfigErrorFields: ErrorFields<SubjectConfigSlice.MainFields> = {
    subjectName: false,
    subSubjectName: false,
    themeName: false,
};

const defaultSubjectConfigErrorMessages: ErrorMessages<SubjectConfigSlice.MainFields> = {
    subjectName: '',
    subSubjectName: '',
    themeName: '',
};

const initialState: CreateTestSlice.State = {
    loading: false,
    subjectConfigErrors: {
        fields: defaultSubjectConfigErrorFields,
        messages: defaultSubjectConfigErrorMessages,
    },
    tasksListErrors: {
        invalidTasks: [],
    },
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
        setSubjectConfigErrorsAction: {
            reducer: (
                state: CreateTestSlice.State,
                { payload }: PayloadAction<CreateTestSlice.SetSubjectConfigErrorsPayload | undefined>,
            ) => ({
                ...state,
                subjectConfigErrors: payload
                    ? {
                        fields: payload.fields
                            ? {
                                ...state.subjectConfigErrors.fields,
                                ...Object
                                    .keys(state.subjectConfigErrors.fields || {})
                                    .reduce((acc, curr) => ({
                                        ...acc,
                                        [curr]: payload.fields.some(field => field === curr),
                                    }), {}),
                            }
                            : state.subjectConfigErrors.fields,
                        messages: {
                            ...state.subjectConfigErrors.messages,
                            ...payload.messages,
                        },
                    }
                    : {
                        fields: defaultSubjectConfigErrorFields,
                        messages: defaultSubjectConfigErrorMessages,
                    },
            }),
            prepare: (payload?: CreateTestSlice.SetSubjectConfigErrorsPayload) => ({
                payload: payload
                    ? payload
                    : undefined,
            }),
        },
        setTasksListErrorsAction: (
            state: CreateTestSlice.State,
            { payload }: PayloadAction<CreateTestSlice.TasksListErrors>,
        ) => ({
            ...state,
            tasksListErrors: payload,
        }),
    },
});

/** Export actions */
export const {
    setCreateTestLoadingAction,
    setSubjectConfigErrorsAction,
    setTasksListErrorsAction,
} = createTest.actions;

/** Export reducer */
export default createTest.reducer;
