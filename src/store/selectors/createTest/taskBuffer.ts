// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Selectors for 'TaskBuffer' reducer.

// External imports
import { RootState } from 'store/slices';

export const selectTaskBuffer = (state: RootState) =>
    state.createTest.taskBuffer;
