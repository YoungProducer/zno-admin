// Created by: Oleksnadr Bezrukov
// Creation date: 4 February 2020

/**
 * Create selectors related to 'TasksList' slice.
 */

// Application's imports
import { RootState } from 'store/slices';

export const selectTasksList = (state: RootState) => state.createTest.tasksList.tasks;

export const selectTasksListEditionMode = (state: RootState) => state.createTest.tasksList.editionMode;
