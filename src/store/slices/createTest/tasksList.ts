// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

// Slice related to saving all tasks untill its will be sended to server.

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { IImage, ETaskType } from './taskBuffer';

export interface ITask {
    /**
     * Unique id to correct editing and deleting.
     */
    id: number;
    /**
     * Define type of task: single answer, relation or text answers.
     */
    taskType: ETaskType;
    /**
     * Contain answer related to task type.
     */
    answer: number | any[];
    /**
     * Contain full file data and preview string.
     */
    taskImage: IImage;
    /**
     * Contain full file data and preview string.
     */
    explanationImage: IImage;
    /**
     * Related only to text answer.
     * Responsible for amount of text answers.
     */
    answersAmount: number;
}

interface ITaskListInitialState {
    tasks: ITask[];
    editionMode: boolean;
}

const initialState: ITaskListInitialState = {
    tasks: [],
    editionMode: false,
};

/**
 * AddTaskAction
 */
export interface IAddTaskPayload extends Omit<ITask, 'id'> {}

interface IAddTaskAction {
    payload: IAddTaskPayload;
}

/**
 * DeleteTaskAction
 */
interface IDeleteTaskAction {
    // Unique id to correct deleting
    payload: number;
}

/**
 * DeleteImageAction
 */
interface IDeleteImageAction {
    // Unique task id.
    payload: number;
}

/**
 * ChangeTaskAnswerAction
 */
export interface IChangeTaskAnswerPayload {
    /**
     * Unique task id.
     */
    id: number;
    /**
     * New answer.
     */
    answer: number | any[];
}

interface IChangeTaskAnswerAction {
    payload: IChangeTaskAnswerPayload;
}

/**
 * ChangeTaskImageAction, ChangeExplanationImageAction.
 */
export interface IChangeImagePayload {
    /**
     * Unique task id.
     */
    id: number;
    /**
     * New image.
     */
    image: File;
}

interface IChangeImageAction {
    payload: IChangeImagePayload;
}

/**
 * ChangeTaskTypeAction
 */
export interface IChangeTaskTypePayload {
    /**
     * Unique task id.
     */
    id: number;
    /**
     * New task type.
     */
    type: ETaskType;
}

interface IChangeTaskTypeAction {
    payload: IChangeTaskTypePayload;
}

/**
 * ChangeAnswersAmountAction
 */
export interface IChangeAnswersAmountPayload {
    /**
     * Unique task id.
     */
    id: number;
    /**
     * New amount of tasks.
     */
    answersAmount: number;
}

interface IChangeAnswersAmountAction {
    payload: IChangeAnswersAmountPayload;
}

let id: number = 0;

const tasksListSlice = createSlice({
    initialState,
    name: 'TasksList',
    reducers: {
        /**
         * Activate edition mode.
         */
        activateEditionModeAction: (
            state: ITaskListInitialState,
        ) => ({
            ...state,
            editionMode: true,
        }),
        /**
         * Deactivate edition mode.
         */
        deactivateEditionModeAction: (
            state: ITaskListInitialState,
        ) => ({
            ...state,
            editionMode: false,
        }),
        /**
         * Add new task in end of list.
         * With unique id.
         * Id increments after assignment.
         */
        addTaskAction: (
            state: ITaskListInitialState,
            { payload }: IAddTaskAction,
        ) => ({
            ...state,
            tasks: state.tasks.concat({ ...payload, id: id++ }),
        }),
        /**
         * Delete task by id.
         */
        deleteTaskAction: (
            state: ITaskListInitialState,
            { payload }: IDeleteTaskAction,
        ) => ({
            ...state,
            tasks: state.tasks.filter(task => task.id !== payload),
        }),
        /**
         * Delete task image by task id.
         * Revoke image preview.
         */
        deleteTaskImageAction: (
            state: ITaskListInitialState,
            { payload }: IDeleteImageAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => {
                    if (task.id === payload) {
                        URL.revokeObjectURL(task.taskImage.preview);
                        return {
                            ...task,
                            taskImage: null,
                        };
                    }
                    return task;
                })
                : state.tasks,
        }),
        /**
         * Delete explanation image by task id.
         * Revoke image preview.
         */
        deleteExplanationImageAction: (
            state: ITaskListInitialState,
            { payload }: IDeleteImageAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => {
                    if (task.id === payload) {
                        URL.revokeObjectURL(task.explanationImage.preview);
                        return {
                            ...task,
                            explanationImage: null,
                        };
                    }
                    return task;
                })
                : state.tasks,
        }),
        /**
         * Change type of task by id.
         */
        changeTaskTypeAction: (
            state: ITaskListInitialState,
            { payload }: IChangeTaskTypeAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => task.id === payload.id
                    ? ({
                        ...task,
                        taskType: payload.type,
                        answer: payload.type === ETaskType.ONE_RIGHT
                            ? -1
                                : payload.type === ETaskType.RELATIONS
                                ? [-1, -1, -1, -1]
                            : [''],
                    })
                    : task)
                : state.tasks,
        }),
        /**
         * Change answer of task by id.
         * Task answer changes only if edit mode is active.
         */
        changeTaskAnswerAction: (
            state: ITaskListInitialState,
            { payload }: IChangeTaskAnswerAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => task.id === payload.id
                    ? ({
                        ...task,
                        answer: payload.answer,
                    })
                    : task)
                : state.tasks,
        }),
        /**
         * Change task image by task id.
         * Task image changes only if edit mode is active.
         */
        changeTaskImageAction: (
            state: ITaskListInitialState,
            { payload }: IChangeImageAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => {
                    if (task.id === payload.id) {
                        if (task.taskImage !== null) {
                            URL.revokeObjectURL(task.taskImage.preview);
                        }
                        return {
                            ...task,
                            taskImage: Object.assign(payload.image, { preview: URL.createObjectURL(payload.image) }),
                        };
                    }
                    return task;
                })
                : state.tasks,
        }),
        /**
         * Change explanation image by task id.
         * Explanation image changes only if edit mode is active.
         */
        changeExplanationImageAction: (
            state: ITaskListInitialState,
            { payload }: IChangeImageAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => {
                    if (task.id === payload.id) {
                        if (task.explanationImage !== null) {
                            URL.revokeObjectURL(task.explanationImage.preview);
                        }

                        return {
                            ...task,
                            explanationImage: Object.assign(payload.image, { preview: URL.createObjectURL(payload.image) }),
                        };
                    }
                    return task;
                })
                : state.tasks,
        }),
        /**
         * Change amount of text answers by task id.
         * Answers amount changes only if edit mode is active.
         */
        changeAnswersAmountAction: (
            state: ITaskListInitialState,
            { payload }: IChangeAnswersAmountAction,
        ) => ({
            ...state,
            tasks: state.editionMode
                ? state.tasks.map(task => task.id === payload.id
                    ? ({
                        ...task,
                        answersAmount: payload.answersAmount,
                        answer: Array.isArray(task.answer) && task.answer.length < payload.answersAmount
                            ? task.answer.concat([''])
                                : Array.isArray(task.answer) && task.answer.length > payload.answersAmount
                                ? task.answer.slice(0, payload.answersAmount)
                            : task.answer,
                    })
                    : task)
                : state.tasks,
        }),
    },
});

export const {
    activateEditionModeAction,
    deactivateEditionModeAction,
    addTaskAction,
    deleteTaskAction,
    deleteTaskImageAction,
    deleteExplanationImageAction,
    changeTaskTypeAction,
    changeTaskAnswerAction,
    changeTaskImageAction,
    changeExplanationImageAction,
    changeAnswersAmountAction,
} = tasksListSlice.actions;

export default tasksListSlice.reducer;
