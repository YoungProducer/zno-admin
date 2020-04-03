/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 April 2020
 *
 * Selectors for task slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectTaskType = (state: RootState) =>
    state.task.type;

export const selectTaskAnswer = (state: RootState) =>
    state.task.answer;

export const selectTaskAnswersAmount = (state: RootState) =>
    state.task.answersAmount;
