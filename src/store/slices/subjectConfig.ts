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

export namespace SubjectConfigSlice {
    export interface MainFields {
        subjectName: string;
        subSubjectName: string;
        themeName: string;
    }

    export interface AdditionalFields {
        withSubSubject: boolean;
        testType: TTestType;
        examType: TExamType;
    }

    export interface State extends MainFields, AdditionalFields {}
}

const initialState: SubjectConfigSlice.State = {
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
            state: SubjectConfigSlice.State,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            subjectName: payload,
        }),
        setSubSubjectNameAction: (
            state: SubjectConfigSlice.State,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            subSubjectName: state.withSubSubject ? payload : state.subSubjectName,
        }),
        setThemeNameAction: (
            state: SubjectConfigSlice.State,
            { payload }: PayloadAction<string>,
        ) => ({
            ...state,
            themeName: payload,
        }),
        setTestTypeAction: (
            state: SubjectConfigSlice.State,
            { payload }: PayloadAction<TTestType>,
        ) => ({
            ...state,
            testType: payload,
        }),
        setExamTypeAction: (
            state: SubjectConfigSlice.State,
            { payload }: PayloadAction<TExamType>,
        ) => ({
            ...state,
            examType: payload,
        }),
        toggleWithSubSubjectAction: (
            state: SubjectConfigSlice.State,
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
