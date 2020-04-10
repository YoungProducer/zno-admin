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

export type ImageType = 'task' | 'explanation';

export type TaskImages<T = Image> = {
    [attr in ImageType]?: T;
};

export type TaskType = 'SINGLE' | 'RELATIONS' | 'TEXT';

export interface Task {
    answer: string[];
    type: TaskType;
    /** Related only for text type of answer */
    answersAmount: number;
    images: TaskImages;
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

    export type SetImagePayload = {
        [attr in ImageType]?: File;
    };

    export interface State extends Task {}
}

const initialState: TaskSlice.State = {
    answer: [''],
    type: 'SINGLE',
    answersAmount: 1,
    images: {
        task: null,
        explanation: null,
    },
};

export const createImage = (image?: File): Image =>
    image
        ? Object.assign(image, { preview: URL.createObjectURL(image) })
        : null;

export const deleteImage = (image: Image) =>
    image !== null
        ? URL.revokeObjectURL(image.preview)
        : null;

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
        setImageAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<TaskSlice.SetImagePayload>,
        ) => ({
            ...state,
            images: {
                ...state.images,
                ...Object.entries(payload).reduce((acc, curr) => ({
                    ...acc,
                    [curr[0]]: createImage(curr[1]),
                }), {}),
            },
        }),
        deleteImageAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<ImageType>,
        ) => {
            deleteImage(state.images[payload]);
            return {
                ...state,
                images: {
                    ...state.images,
                    [payload]: null,
                },
            };
        },
        /**
         * Sets all properties to default
         * @param { Boolean } payload - related to object url revoking
         */
        clearTaskAction: (
            state: TaskSlice.State,
            { payload }: PayloadAction<boolean>,
        ) => {
            if (payload) {
                deleteImage(state.images.task);
                deleteImage(state.images.explanation);
            }

            return {
                ...initialState,
                ...changeTaskType(state.type),
            };
        },
    },
});

export const {
    setImageAction,
    deleteImageAction,
    setTaskTypeAction,
    setAnswerAction,
    setAnswersAmountAction,
    clearTaskAction,
} = task.actions;

export default task.reducer;
