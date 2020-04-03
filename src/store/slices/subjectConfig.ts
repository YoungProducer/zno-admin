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
    export interface ErrorFields {
        subjectName: boolean;
        subSubjectName: boolean;
        themeName: boolean;
    }

    export interface FieldsMessages {
        subjectName: string;
        subSubjectName: string;
        themeName: string;
    }

    export interface State {
        subjectName: string;
        subSubjectName: string;
        themeName: string;
        withSubSubject: boolean;
        testType: TTestType;
        examType: TExamType;
        errorFields: ErrorFields;
        fieldsMessages: FieldsMessages;
    }
}

const defaultErrorFields: SubjectConfigSlice.ErrorFields = {
    subjectName: false,
    subSubjectName: false,
    themeName: false,
};

const defaultFieldsMessages: SubjectConfigSlice.FieldsMessages = {
    subjectName: '',
    subSubjectName: '',
    themeName: '',
};

const initialState: SubjectConfigSlice.State = {
    subjectName: '',
    subSubjectName: '',
    themeName: '',
    withSubSubject: false,
    testType: 'EXAM',
    examType: 'TRAINING',
    errorFields: defaultErrorFields,
    fieldsMessages: defaultFieldsMessages,
};

const subjectConfig = createSlice({
    initialState,
    name: 'SubjectConfigSlice',
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
        setSubjectConfigErrorFields: {
            reducer: (
                state: SubjectConfigSlice.State,
                { payload }: PayloadAction<string[]>,
            ) => {
                const errorFields = Object.keys(state.errorFields).reduce((acc, curr) => {
                    const match = payload.some(field => field === curr);

                    return {
                        ...acc,
                        [curr]: match,
                    };
                }, {} as SubjectConfigSlice.ErrorFields);

                return {
                    ...state,
                    errorFields,
                };
            },
            prepare: (payload?: string[]) => ({
                payload: payload || [],
            }),
        },
        setSubjectConfigFieldsMessages: {
            reducer: (
                state: SubjectConfigSlice.State,
                { payload }: PayloadAction<Partial<SubjectConfigSlice.FieldsMessages>>,
            ) => ({
                ...state,
                fieldsMessages: {
                    ...state.fieldsMessages,
                    ...payload,
                },
            }),
            prepare: (messages?: Partial<SubjectConfigSlice.FieldsMessages>) => ({
                payload: messages || defaultFieldsMessages,
            }),
        },
    },
});

export const {
    setExamTypeAction,
    setSubSubjectNameAction,
    setSubjectNameAction,
    setTestTypeAction,
    setThemeNameAction,
    toggleWithSubSubjectAction,
    setSubjectConfigErrorFields,
    setSubjectConfigFieldsMessages,
} = subjectConfig.actions;

export default subjectConfig.reducer;
