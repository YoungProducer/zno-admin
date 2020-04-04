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

export const changeTaskType = (type: TaskType): Partial<TaskSlice.State> =>
    type === 'RELATIONS'
        ? { type, answer: ['', '', '', ''] }
        : {
            type,
            answer: [''],
            answersAmount: 1,
        };

export type ChangeTaskAnswer =
    <T extends
        Partial<TaskSlice.SetAnswerPayload>
        & { currAnswer: Task['answer']}
    >(payload: T) => Partial<TaskSlice.State>;

export const changeTaskAnswer: ChangeTaskAnswer = ({
    currAnswer,
    answer,
    elIndex,
}) => ({
    answer: currAnswer.map((el, index) =>
        index !== elIndex
            ? el
            : answer),
});

export type ChangeAnswersAmount = (payload: {
    currAnswer: Task['answer'],
    currAnswersAmount: Task['answersAmount'],
    amount: number,
}) => Partial<TaskSlice.State>;

export const changeAnswersAmount: ChangeAnswersAmount = ({
    currAnswer,
    currAnswersAmount,
    amount,
}) => ({
    answersAmount: amount,
    answer: amount > currAnswersAmount
        ? currAnswer.concat([''])
        : currAnswer.slice(0, amount),
});

const task = createSlice({
    initialState,
    name: 'Task',
    reducers: {
        setTaskTypeAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<TaskType>,
        ) => ({
            ...state,
            ...changeTaskType(payload),
        }),
        setAnswerAction: {
            reducer: (
                state: TaskSlice.State,
                { payload }: PayloadAction<TaskSlice.SetAnswerPayload>,
            ) => ({
                ...state,
                ...changeTaskAnswer({
                    ...payload,
                    currAnswer: state.answer,
                }),
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
            ...changeAnswersAmount({
                currAnswer: state.answer,
                currAnswersAmount: state.answersAmount,
                amount: payload,
            }),
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
