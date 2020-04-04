/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Selectors for TasksList slice.
 */

/** External imports */

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
