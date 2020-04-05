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

export const selectTasksList = (state: RootState) =>
    state.tasksList.tasks;

export const selectTasksListOpen = (state: RootState) =>
    state.tasksList.open;

export const selectTasksListEditionMode = (state: RootState) =>
    state.tasksList.editionMode;

export const selectTasksListNextId = (state: RootState) =>
    state.tasksList.id;

export const selectTasksAmount = (state: RootState) =>
    state.tasksList.tasks.length;

export const selectTasksAmountWithTaskImage = createSelector(
    selectTasksList,
    (tasks) => tasks.reduce((acc, curr) =>
        curr.image === null
            ? acc
            : acc + 1, 0),
);

export const selectTasksAmountWithExplanationImage = createSelector(
    selectTasksList,
    (tasks) => tasks.reduce((acc, curr) =>
        curr.explanationImage === null
            ? acc
            : acc + 1, 0),
);
