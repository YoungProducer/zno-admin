// Created by: Oleksnadr Bezrukov
// Creation date: 4 February 2020

/**
 * Create selectors related to 'TasksList' slice.
 */

// External imports
import { createSelector } from '@reduxjs/toolkit';

// Application's imports
import { RootState } from 'store/slices';

export const selectTasksList = (state: RootState) => state.createTest.tasksList.tasks;

export const selectTasksListEditionMode = (state: RootState) => state.createTest.tasksList.editionMode;

export const selectIsHaveErrors = createSelector(
    selectTasksList,
    (tasks) => tasks.some(task => task.error),
);
