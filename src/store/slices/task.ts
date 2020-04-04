/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Slice which handles task creations.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Image extends File {
    /** Blob string */
    preview: string;
}

export type TaskType = 'SINGLE' | 'RELATIONS' | 'TEXT';

export interface Task {
    answer: string[];
    type: TaskType;
    /** Related only for text type of answer */
    answersAmount: number;
    /** Task image */
    image: Image;
    /** Explanation image */
    explanationImage: Image;
}

export namespace TaskSlice {

    export interface SetAnswerPayload {
        /**
         * Index of element.
         * For example:
         *  answer = ['1, '2', '1'];
         *  elIndex = 1;
         *  el = '2';
         */
        elIndex: number;
        answer: string;
    }

    export interface State extends Task {}
}

const initialState: TaskSlice.State = {
    answer: [''],
    type: 'SINGLE',
    answersAmount: 1,
    image: null,
    explanationImage: null,
};

const task = createSlice({
    initialState,
    name: 'Task',
    reducers: {
        setTaskTypeAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<TaskType>,
        ) => ({
            ...state,
            type: payload,
            answer: payload === 'RELATIONS'
                ? ['', '', '', '']
                : [''],
        }),
        setAnswerAction: {
            reducer: (
                state: TaskSlice.State,
                { payload }: PayloadAction<TaskSlice.SetAnswerPayload>,
            ) => ({
                ...state,
                answer: state.answer.map((el, index) =>
                    index !== payload.elIndex
                        ? el
                        : payload.answer),
            }),
            prepare: ({ elIndex, answer }: Partial<TaskSlice.SetAnswerPayload>) => ({
                payload: {
                    elIndex: elIndex || 0,
                    answer: answer || '',
                },
            }),
        },
        setAnswersAmountAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<number>,
        ) => ({
            ...state,
            answersAmount: payload,
            answer: payload > state.answersAmount
                ? state.answer.concat([''])
                : state.answer.slice(0, payload),
        }),
        setTaskImageAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<File>,
        ) => ({
            ...state,
            image: Object.assign(payload, {
                preview: URL.createObjectURL(payload),
            }),
        }),
        deleteTaskImageAction: (
            state: TaskSlice.State,
        ) => {
            // Delete reference to this object in browser to prevent memory leak
            URL.revokeObjectURL(state.image.preview);

            return {
                ...state,
                image: null,
            };
        },
        setExplanationImageAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<File>,
        ) => ({
            ...state,
            explanationImage: Object.assign(payload, {
                preview: URL.createObjectURL(payload),
            }),
        }),
        deleteExplanationImageAction: (
            state: TaskSlice.State,
        ) => {
            // Delete reference to this object in browser to prevent memory leak
            URL.revokeObjectURL(state.explanationImage.preview);

            return {
                ...state,
                image: null,
            };
        },
        /** Sets all properties to default */
        clearTaskAction: (state: TaskSlice.State) => {
            URL.revokeObjectURL(state.image.preview);
            URL.revokeObjectURL(state.explanationImage.preview);

            return {
                ...initialState,
            };
        },
    },
});

export const {
    setTaskTypeAction,
    setAnswerAction,
    setAnswersAmountAction,
    setTaskImageAction,
    deleteTaskImageAction,
    setExplanationImageAction,
    deleteExplanationImageAction,
    clearTaskAction,
} = task.actions;

export default task.reducer;
