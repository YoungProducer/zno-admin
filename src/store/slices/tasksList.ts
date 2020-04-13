/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 April 2020
 *
 * Slice which handles storing the all tasks which have been created.
 */

/** External imports */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Application's imports */
import {
    Task,
    TaskType,
    TaskSlice,
    TaskImages,
    ImageType,
    changeTaskType,
    changeTaskAnswer,
    changeAnswersAmount,
    createImage,
    deleteImage,
} from './task';

export namespace TasksListSlice {
    export type ExtendedTask =
        Task
        & { id: number; };

    export type TaskForAddition =
        Omit<Task, 'images'>
        & {
            images: TaskImages<File>;
        };

    export type AddPayload = Partial<TaskForAddition> | Partial<TaskForAddition>[];

    export interface UpdatePayload {
        data: Partial<Omit<TaskForAddition, 'answer'> & {
            answer: Partial<TaskSlice.SetAnswerPayload>;
            images: TaskImages<File>;
        }>;
        where: {
            id: number;
        };
    }

    export interface State {
        tasks: Partial<ExtendedTask>[];
        editionMode: boolean;
        /**
         * Id of new task.
         */
        id: number;
        /**
         * Related to tasks list component.
         * Hide or close it.
         */
        open: boolean;
    }
}

const initialState: TasksListSlice.State = {
    tasks: [],
    editionMode: false,
    open: false,
    id: 1,
};

const tasksList = createSlice({
    initialState,
    name: 'TasksList',
    reducers: {
        setEditionModeAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<boolean>,
        ) => ({
            ...state,
            editionMode: payload,
        }),
        setOpenTasksListAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<boolean>,
        ) => ({
            ...state,
            open: payload,
        }),
        addTaskAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<TasksListSlice.AddPayload>,
        ) => ({
            ...state,
            id: !Array.isArray(payload)
                ? state.id + 1
                : state.id + payload.length,
            tasks: !Array.isArray(payload)
                ? state.tasks.concat({
                    ...payload,
                    id: state.id,
                    images: {
                        task: createImage(payload.images.task),
                        explanation: createImage(payload.images.explanation),
                    },
                })
                : state.tasks.concat(payload.map((task, index): Partial<TasksListSlice.ExtendedTask> => ({
                    ...task,
                    id: state.id + index,
                    images: {
                        task: createImage(task.images.task),
                        explanation: createImage(task.images.explanation),
                    },
                }))),
        }),
        deleteTaskByIdAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<number>,
        ) => ({
            ...state,
            tasks: state.tasks.filter((task, index) => index !== payload),
        }),
        updateTaskAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<TasksListSlice.UpdatePayload>,
        ) => ({
            ...state,
            tasks: state.tasks.map((task, index) => {
                if (index !== payload.where.id) {
                    return task;
                }

                return {
                    ...task,
                    ...Object.entries(payload.data).reduce((acc, curr) => {
                        if (curr[0] === 'images') {
                            const prevImages = task.images;
                            const images = curr[1] as TaskSlice.SetImagePayload;

                            return {
                                ...acc,
                                images: {
                                    ...prevImages,
                                    ...Object.entries(images).reduce((newImages, currImage: [ImageType, File]) => {
                                        const key = currImage[0];
                                        const value = currImage[1];
                                        deleteImage(task.images[key]);

                                        if (value !== null) {
                                            return {
                                                ...newImages,
                                                [key]: createImage(value),
                                            };
                                        }

                                        return {
                                            ...newImages,
                                            [key]: null,
                                        };
                                    }, {}),
                                },
                            };
                        }

                        if (curr[0] === 'type') {
                            return {
                                ...acc,
                                ...changeTaskType(curr[1] as TaskType),
                            };
                        }

                        if (curr[0] === 'answer') {
                            return {
                                ...acc,
                                ...changeTaskAnswer({
                                    currAnswer: task.answer,
                                    ...payload.data.answer,
                                }),
                            };
                        }

                        if (curr[0] === 'answersAmount') {
                            return {
                                ...acc,
                                ...changeAnswersAmount({
                                    currAnswer: task.answer,
                                    currAnswersAmount: task.answersAmount,
                                    amount: curr[1] as number,
                                }),
                            };
                        }

                        return {
                            ...acc,
                            [curr[0]]: curr[1],
                        };
                    }, {}),
                };
            }),
        }),
        clearTasksListAction: (state: TasksListSlice.State) => ({
            ...state,
            id: 0,
            editionMode: false,
            tasks: [],
        }),
    },
});

/** Export actions */
export const {
    setEditionModeAction,
    setOpenTasksListAction,
    addTaskAction,
    deleteTaskByIdAction,
    updateTaskAction,
    clearTasksListAction,
} = tasksList.actions;

/** Export reducer */
export default tasksList.reducer;
