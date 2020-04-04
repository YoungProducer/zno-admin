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

export const selectTaskImage = (state: RootState) =>
    state.task.image;

export const selectExplanationImage = (state: RootState) =>
    state.task.explanationImage;

export const selectImagesPreviews = createSelector(
    [selectTaskImage, selectExplanationImage],
    (taskImage, explanationImage) => ({
        taskImagePreview: taskImage !== null
            ? taskImage.preview
            : '',
        explanationImagePreview: explanationImage !== null
            ? explanationImage.preview
            : '',
    }),
);

export const selectImagesNames = createSelector(
    [selectTaskImage, selectExplanationImage],
    (taskImage, explanationImage) => ({
        taskImageName: taskImage !== null
            ? taskImage.name
            : '',
        explanationImageName: explanationImage !== null
            ? explanationImage.name
            : '',
    }),
);
