/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Selectors for TasksList slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';
import { TasksListSlice } from 'store/slices/tasksList';

export const selectTasksList = (state: RootState): Partial<TasksListSlice.ExtendedTask>[] =>
    state.tasksList.tasks;

export const selectTasksListOpen = (state: RootState) =>
    state.tasksList.open;

export const selectTasksListEditionMode = (state: RootState) =>
    state.tasksList.editionMode;

export const selectTasksListNextId = (state: RootState) =>
    state.tasksList.id;

export const selectTasksAmount = (state: RootState) =>
    state.tasksList.tasks.length;

export const selectTasksAnswers = createSelector(
    selectTasksList,
    (tasks) => tasks.map(task => ({
        answer: task.answer,
        type: task.type,
    })),
);

export const selectTasksImages = createSelector(
    selectTasksList,
    (tasks) => tasks.reduce((acc, curr) => {
        if (curr.images.task !== null) {
            return acc.concat(curr.images.task);
        }

        return acc;
    }, []),
);

export const selectExplanationsImages = createSelector(
    selectTasksList,
    (tasks) => tasks.reduce((acc, curr) => {
        if (curr.images.explanation !== null) {
            return acc.concat(curr.images.explanation);
        }

        return acc;
    }, []),
);

export const selectTasksAmountWithTaskImage = createSelector(
    selectTasksImages,
    (tasksImages) => tasksImages.reduce((acc, curr) =>
        curr === null
            ? acc
            : acc + 1, 0),
);

export const selectTasksAmountWithExplanationImage = createSelector(
    selectExplanationsImages,
    (explanationsImages) => explanationsImages.reduce((acc, curr) =>
        curr === null
            ? acc
            : acc + 1, 0),
);
