/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 April 2020
 *
 * Selectors for task slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';

export const selectTaskSliceState = (state: RootState) =>
    state.task;

export const selectTaskType = (state: RootState) =>
    state.task.type;

export const selectTaskAnswer = (state: RootState) =>
    state.task.answer;

export const selectTaskAnswersAmount = (state: RootState) =>
    state.task.answersAmount;

export const selectTaskImages = (state: RootState) =>
    state.task.images;

export const selectTaskImage = (state: RootState) =>
    state.task.images.task;

export const selectExplanationImage = (state: RootState) =>
    state.task.images.explanation;

export const selectImagesPreviews = createSelector(
    selectTaskImages,
    ({ task, explanation }) => ({
        task: task !== null ? task.preview : '',
        explanation: explanation !== null ? explanation.preview : '',
    }),
);

export const selectImagesNames = createSelector(
    selectTaskImages,
    ({ task, explanation }) => ({
        task: task !== null ? task.name : '',
        explanation: explanation !== null ? explanation.name : '',
    }),
);
