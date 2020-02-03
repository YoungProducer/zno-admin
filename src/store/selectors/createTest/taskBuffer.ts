// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Selectors for 'TaskBuffer' reducer.

// External imports
import { createSelector } from '@reduxjs/toolkit';

// Application's imports
import { RootState } from 'store/slices';
import { IImage } from 'store/slices/createTest';

export const selectTaskBuffer = (state: RootState) =>
    state.createTest.taskBuffer;

export const selectTaskImage = (state: RootState) =>
    state.createTest.taskBuffer.taskImage;

export const selectExplanationImage = (state: RootState) =>
    state.createTest.taskBuffer.explanationImage;

interface ISelectImagesPreviews {
    // Only string for preview
    taskImage: string;
    // Only string for preview
    explanationImage: string;
}

// Select only previews from images
export const selectImagesPreviews = createSelector(
    [selectTaskImage, selectExplanationImage],
    (taskImage: IImage, explanationImage: IImage): ISelectImagesPreviews => ({
        taskImage: taskImage !== null ? taskImage.preview : null,
        explanationImage: explanationImage !== null ? explanationImage.preview : null,
    }),
);

interface ISelecetImagesNames {
    taskImageName: string;
    explanationImageName: string;
}

// Select only names of images
export const selectImagesNames = createSelector(
    [selectTaskImage, selectExplanationImage],
    (taskImage: IImage, explanationImage: IImage): ISelecetImagesNames => ({
        taskImageName: taskImage !== null ? taskImage.name : null,
        explanationImageName: explanationImage !== null ? explanationImage.name : null,
    }),
);
