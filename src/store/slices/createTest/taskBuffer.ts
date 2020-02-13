// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

/**
 * Slice for saving task's settings and images
 * until add it to list.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
// import { ITask } from 'store/slices/createTest';
// import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';
import { ITask } from './tasksList';

export enum ETaskType {
    'ONE_RIGHT' = '0',
    'RELATIONS' = '1',
    'TEXT_FIELDS' = '2',
}

export interface IImage extends File {
    preview: string;
}

export interface ITaskBufferInitialState extends Omit<ITask, 'id'> {
    /**
     * Related only to text answer.
     * Responsible for amount of text answers.
     */
    answersAmount: number;
}

interface ISetTaskTypeAction {
    payload: ETaskType;
}

interface ISetTaskAnswerAction {
    payload: number | any[];
}

interface ISetTaskImageAction {
    payload: File;
}

interface ISetExplanationImageAction {
    payload: File;
}

interface ISetAnswersAmountAction {
    payload: any;
}

const initialState: ITaskBufferInitialState = {
    taskType: ETaskType.ONE_RIGHT,
    answer: -1,
    answersAmount: 1,
    taskImage: null,
    explanationImage: null,
};

const taskBufferSlice = createSlice({
    initialState,
    name: 'TaskBuffer',
    reducers: {
        setBufferTaskTypeAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetTaskTypeAction,
        ) => {
            let answer;

            if (payload === ETaskType.ONE_RIGHT) {
                answer = -1;
            }
            if (payload === ETaskType.RELATIONS) {
                answer = [-1, -1, -1, -1];
            }
            if (payload === ETaskType.TEXT_FIELDS) {
                answer = [''];
            }

            return {
                ...state,
                answer,
                taskType: payload,
                answersAmount: 1,
            };
        },
        setBufferTaskAnswerAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetTaskAnswerAction,
        ) => ({
            ...state,
            answer: payload,
        }),
        setBufferTaskImageAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetTaskImageAction,
        ) => ({
            ...state,
            taskImage: Object.assign(payload, { preview: URL.createObjectURL(payload) }),
        }),
        deleteBufferTaskImageAction: (
            state: ITaskBufferInitialState,
        ) => {
            // Delete reference to this object in browser to prevent memory leak
            URL.revokeObjectURL(state.taskImage.preview);

            return {
                ...state,
                taskImage: null,
            };
        },
        setBufferExplanationImageAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetExplanationImageAction,
        ) => ({
            ...state,
            explanationImage: Object.assign(payload, { preview: URL.createObjectURL(payload) }),
        }),
        deleteBufferExplanationImageAction: (
            state: ITaskBufferInitialState,
        ) => {
            // Delete reference to this object in browser to prevent memory leak
            URL.revokeObjectURL(state.explanationImage.preview);

            return {
                ...state,
                explanationImage: null,
            };
        },
        setBufferAnswersAmountAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetAnswersAmountAction,
        ) => {
            const { answer } = state;
            let newAnswer = answer;
            /**
             * To save previous answers used 'concat' and 'slice' methods.
             * For example:
             * Current array: ['1', '2.5'].
             * Answers count: 1
             * Answers array length: 2
             * New array: ['1'].
             */
            if (Array.isArray(answer)) {
                if (answer.length < payload) {
                    newAnswer = answer.concat(['']);
                } else if (answer.length > payload) {
                    newAnswer = answer.slice(0, payload);
                }
            }
            return {
                ...state,
                answer: newAnswer,
                answersAmount: payload,
            };
        },
        /**
         * Set all properties to default
         */
        clearTaskBufferAction: () => ({
            ...initialState,
        }),
    },
});

export const {
    setBufferTaskTypeAction,
    setBufferTaskAnswerAction,
    setBufferTaskImageAction,
    deleteBufferExplanationImageAction,
    setBufferExplanationImageAction,
    deleteBufferTaskImageAction,
    setBufferAnswersAmountAction,
    clearTaskBufferAction,
} = taskBufferSlice.actions;

export default taskBufferSlice.reducer;
