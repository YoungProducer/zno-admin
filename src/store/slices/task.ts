/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Slice which handles task creations.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export namespace TaskSlice {
    export type TaskType = 'SINGLE' | 'RELATIONS' | 'TEXT';

    export interface SetAnswerPayload {
        /**
         * Index of element.
         * For example:
         *  answer = ['1, '2', '1'];
         *  index = 1;
         *  el = '2';
         */
        index: number;
        answer: string;
    }

    export interface State {
        answer: string[];
        type: TaskType;
        /** Related only for text type of answer */
        answersAmount: number;
    }
}

const initialState: TaskSlice.State = {
    answer: [],
    type: 'SINGLE',
    answersAmount: 1,
};

const task = createSlice({
    initialState,
    name: 'Task',
    reducers: {
        setTaskTypeAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<TaskSlice.TaskType>,
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
                    index !== payload.index
                        ? el
                        : payload.answer),
            }),
            prepare: ({ index, answer }: Partial<TaskSlice.SetAnswerPayload>) => ({
                payload: {
                    index: index || 0,
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
                : state.answer.slice(payload),
        }),
    },
});

export const {
    setTaskTypeAction,
    setAnswerAction,
    setAnswersAmountAction,
} = task.actions;

export default task.reducer;
