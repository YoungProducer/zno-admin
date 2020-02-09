// Created by: Oleksandr Bezrukov
// Creation date: 9 February 2020

/**
 * Slice to handle requests related to subject configurations.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ILoadingAction } from '../types';

/**
 * SetSubjectsAction
 */
export interface ISetSubjectsAction {
    payload: string[];
}

/**
 * SetCreateSubjectErrorMesageAction
 */
export interface ISetCreateSubjectErrorMesageAction {
    payload: string;
}

export interface ISubjectConfigurationsInitialState {
    subjects: string[];
    loadingSubjects: boolean;
    loadingCreateSubject: boolean;
    craeteSubjectErrorMessage: string;
}

const initialState: ISubjectConfigurationsInitialState = {
    subjects: [],
    loadingSubjects: false,
    loadingCreateSubject: false,
    craeteSubjectErrorMessage: '',
};

const subjectConfigurationsSlice = createSlice({
    initialState,
    name: 'SubjectConfigurations',
    reducers: {
        setSubjectsActions: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetSubjectsAction,
        ) => ({
            ...state,
            subjects: payload,
        }),
        loadingSubjectsAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loadingSubjects: payload,
        }),
        loadingCreateSubjectsAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ILoadingAction,
            ) => ({
                ...state,
                loadingCreateSubject: payload,
            }),
        setCreateSubjectErrorMessageAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetCreateSubjectErrorMesageAction,
        ) => ({
            ...state,
            craeteSubjectErrorMessage: payload,
        }),
    },
});

export const {
    setSubjectsActions,
    loadingSubjectsAction,
    loadingCreateSubjectsAction,
    setCreateSubjectErrorMessageAction,
} = subjectConfigurationsSlice.actions;

export default subjectConfigurationsSlice.reducer;
