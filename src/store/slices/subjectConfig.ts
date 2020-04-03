/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Slice which handles subject configuration.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TTestType = 'THEME' | 'EXAM';
export type TExamType = 'SESSION' | 'TRAINING';

export interface ISubjectConfigState {
    subjectName: string;
    subSubjectName: string;
    themeName: string;
    withSubSubject: boolean;
    testType: TTestType;
    examType: TExamType;
}

const initialState: ISubjectConfigState = {
    subjectName: '',
    subSubjectName: '',
    themeName: '',
    withSubSubject: false,
    testType: 'EXAM',
    examType: 'TRAINING',
};

const subjectConfig = createSlice({
    initialState,
    name: 'SubjectConfig',
    reducers: {
        setSubjectNameAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            subjectName: payload,
        }),
        setSubSubjectNameAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            subSubjectName: state.withSubSubject ? payload : state.subSubjectName,
        }),
        setThemeNameAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            themeName: payload,
        }),
        setTestTypeAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<TTestType>,
        ) => ({
            ...state,
            testType: payload,
        }),
        setExamTypeAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<TExamType>,
        ) => ({
            ...state,
            examType: payload,
        }),
        toggleWithSubSubjectAction: (
            state: ISubjectConfigState,
            { payload }: PayloadAction<boolean>,
        ) => ({
            ...state,
            withSubSubject: payload,
        }),
    },
});

export const {
    setExamTypeAction,
    setSubSubjectNameAction,
    setSubjectNameAction,
    setTestTypeAction,
    setThemeNameAction,
    toggleWithSubSubjectAction,
} = subjectConfig.actions;

export default subjectConfig.reducer;
