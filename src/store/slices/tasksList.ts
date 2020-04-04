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
    changeTaskType,
    changeTaskAnswer,
    changeAnswersAmount,
} from './task';

export namespace TasksListSlice {
    export type ExtendedTask =
        Task
        & { id: number; };

    export type AddPayload = ExtendedTask | Partial<ExtendedTask>[];

    export interface UpdatePayload {
        data: Partial<Omit<ExtendedTask, 'answer'> & {
            answer: Partial<TaskSlice.SetAnswerPayload>,
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
                ? state.tasks.concat({ ...payload, id: state.id })
                : state.tasks.concat(payload.map((task, index) => ({
                    ...task,
                    id: state.id + index,
                }))),
        }),
        deleteTaskByIdAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<number>,
        ) => ({
            ...state,
            tasks: state.tasks.filter(task => task.id !== payload),
        }),
        updateTaskAction: (
            state: TasksListSlice.State,
            { payload }: PayloadAction<TasksListSlice.UpdatePayload>,
        ) => ({
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id !== payload.where.id) {
                    return task;
                }

                return {
                    ...task,
                    ...Object.entries(payload.data).reduce((acc, curr) => {
                        if (curr[0] === 'image') {
                            if (curr[1] === null) {
                                URL.revokeObjectURL(task.image.preview);
                            } else if (curr[1] !== null && curr[1]) {
                                URL.revokeObjectURL(task.image.preview);
                                return {
                                    ...acc,
                                    [curr[0]]: Object.assign(curr[1], {
                                        preview: URL.createObjectURL(curr[1]),
                                    }),
                                };
                            }
                        }

                        if (curr[0] === 'explanationImage') {
                            if (curr[1] === null) {
                                URL.revokeObjectURL(task.explanationImage.preview);
                            } else if (curr[1] !== null && curr[1]) {
                                URL.revokeObjectURL(task.explanationImage.preview);
                                return {
                                    ...acc,
                                    [curr[0]]: Object.assign(curr[1], {
                                        preview: URL.createObjectURL(curr[1]),
                                    }),
                                };
                            }
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
    },
});

/** Export actions */
export const {
    setEditionModeAction,
    setOpenTasksListAction,
    addTaskAction,
    deleteTaskByIdAction,
    updateTaskAction,
} = tasksList.actions;

/** Export reducer */
export default tasksList.reducer;
