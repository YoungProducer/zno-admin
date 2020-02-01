// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

/**
 * Slice for saving task's settings and images
 * until add it to list.
 */

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';

interface ITaskBufferInitialState {
    taskType: ETaskType;
    answer: number | any[];
    taskImage?: any;
    explanationImage?: any;
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
    payload: any;
}

interface ISetExplanationImageAction {
    payload: any;
}

interface ISetAnswersAmountAction {
    payload: any;
}

const initialState: ITaskBufferInitialState = {
    taskType: ETaskType.ONE_RIGHT,
    answer: -1,
    answersAmount: 1,
};

const taskBufferSlice = createSlice({
    initialState,
    name: 'TaskBuffer',
    reducers: {
        setTaskTypeAction: (
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
        setTaskAnswerAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetTaskAnswerAction,
        ) => ({
            ...state,
            answer: payload,
        }),
        setTaskImageAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetTaskImageAction,
        ) => ({
            ...state,
            taskImage: payload,
        }),
        setExplanationImageAction: (
            state: ITaskBufferInitialState,
            { payload }: ISetExplanationImageAction,
        ) => ({
            ...state,
            explanationImage: payload,
        }),
        setAnswersAmountAction: (
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
    },
});

export const {
    setTaskTypeAction,
    setTaskAnswerAction,
    setTaskImageAction,
    setExplanationImageAction,
    setAnswersAmountAction,
} = taskBufferSlice.actions;

export default taskBufferSlice.reducer;
