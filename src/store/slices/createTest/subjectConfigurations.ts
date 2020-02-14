// Created by: Oleksandr Bezrukov
// Creation date: 9 February 2020

/**
 * Slice to handle requests related to subject configurations.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ILoadingAction } from '../types';

export enum ETestTypes {
    'THEMES' = '0',
    'EXAM' = '1',
}

export enum EExamTypes {
    'TRAINING' = '0',
    'PREV_SESSIONS' = '1',
}

/**
 * SetSubjectNameAction
 */
interface ISetSubjectNameAction {
    payload: string;
}

/**
 * SetSubSubjectNameAction
 */
interface ISetSubSubjectNameAction {
    payload: string;
}

/**
 * SetTestTypeAction
 */
interface ISetTestTypeAction {
    payload: ETestTypes;
}

/**
 * SetExamTypeAction
 */
interface ISetExamTypeAction {
    payload: EExamTypes;
}

/**
 * SetThemeNameAction
 */
interface ISetThemeNameAction {
    payload: string;
}

/**
 * SetSubjectsAction
 */
interface ISetSubjectsAction {
    payload: string[];
}

/**
 * SetCreateSubjectErrorMesageAction
 */
interface ISetCreateSubjectErrorMesageAction {
    payload: string;
}

export interface ISubjectConfigurationsInitialState {
    subjectName: string;
    subSubjectName: string;
    testType: ETestTypes;
    examType: EExamTypes;
    themeName: string;
    subjects: string[];
    loadingSubjects: boolean;
    loadingCreateSubject: boolean;
    craeteSubjectErrorMessage: string;
}

const initialState: ISubjectConfigurationsInitialState = {
    subjectName: '',
    subSubjectName: '',
    testType: ETestTypes.THEMES,
    examType: EExamTypes.TRAINING,
    themeName: '',
    subjects: [],
    loadingSubjects: false,
    loadingCreateSubject: false,
    craeteSubjectErrorMessage: '',
};

const subjectConfigurationsSlice = createSlice({
    initialState,
    name: 'SubjectConfigurations',
    reducers: {
        setSubjectNameAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetSubjectNameAction,
        ) => ({
            ...state,
            subjectName: payload,
        }),
        setSubSubjectNameAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetSubSubjectNameAction,
        ) => ({
            ...state,
            subSubjectName: payload,
        }),
        setTestTypeAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetTestTypeAction,
        ) => ({
            ...state,
            testType: payload,
        }),
        setExamTypeAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetExamTypeAction,
        ) => ({
            ...state,
            examType: payload,
        }),
        setThemeNameAction: (
            state: ISubjectConfigurationsInitialState,
            { payload }: ISetThemeNameAction,
        ) => ({
            ...state,
            themeName: payload,
        }),
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
    setSubjectNameAction,
    setSubSubjectNameAction,
    setTestTypeAction,
    setExamTypeAction,
    setThemeNameAction,
    setSubjectsActions,
    loadingSubjectsAction,
    loadingCreateSubjectsAction,
    setCreateSubjectErrorMessageAction,
} = subjectConfigurationsSlice.actions;

export default subjectConfigurationsSlice.reducer;
