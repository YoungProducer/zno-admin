/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Slice which save and manipulate with subjects data.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import { Subject } from 'api/types';

export interface ISetSubjectsAction {
    payload: Subject.Data[];
}

export type TAddSubjectPayload = Subject.Data;

export interface ISubjectState {
    loading: boolean;
    subjects: Subject.Data[];
    subSubjects: Subject.Data[];
}

const initialState: ISubjectState = {
    loading: false,
    subjects: [],
    subSubjects: [],
};

const subject = createSlice({
    initialState,
    name: 'Subject',
    reducers: {
        toggleSubjectLoadingAction: (
            state: ISubjectState,
            { payload }: PayloadAction<boolean>,
        ) => ({
            ...state,
            loading: payload,
        }),
        setSubjectsAction: (
            state: ISubjectState,
            { payload }: ISetSubjectsAction,
        ) => ({
            ...state,
            subjects: payload,
        }),
        setSubSubjectsAction: (
            state: ISubjectState,
            { payload }: ISetSubjectsAction,
        ) => ({
            ...state,
            subSubjects: payload,
        }),
        addSubjectAction: (
            state: ISubjectState,
            { payload }: PayloadAction<TAddSubjectPayload>,
        ) => {
            const newSubjects = state.subjects.concat(payload);

            return {
                ...state,
                subjects: newSubjects,
            };
        },
        addSubSubjectAction: (
            state: ISubjectState,
            { payload }: PayloadAction<TAddSubjectPayload>,
        ) => {
            const newSubSubjects = state.subSubjects.concat(payload);

            return {
                ...state,
                subSubjects: newSubSubjects,
            };
        },
    },
});

export const {
    toggleSubjectLoadingAction,
    setSubjectsAction,
    setSubSubjectsAction,
    addSubjectAction,
    addSubSubjectAction,
} = subject.actions;

export default subject.reducer;
