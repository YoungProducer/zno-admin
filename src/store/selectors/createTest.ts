/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 April 2020
 *
 * Selectors for 'CreateTest' slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectCreateTestLoading = (state: RootState) =>
    state.createTest.loading;

export const selectSubjectConfigErrorFields = (state: RootState) =>
    state.createTest.subjectConfigErrors.fields || {};

export const selectTasksListErrors = (state: RootState) =>
    state.createTest.tasksListErrors;
