// Created by: Oleksandr Bezrukov
// Creation date: 9 February 2020

/**
 * Selectors realated to the 'subjectConfigurations' reducer.
 */

// Application's imports
import { RootState } from 'store/slices';

export const selectSubjects = (state: RootState): string[] =>
    state.createTest.subjectConfigurations.subjects;

export const selectSubjectsLoading = (state: RootState): boolean =>
    state.createTest.subjectConfigurations.loadingSubjects;

export const selectCreateSubjectLoading = (state: RootState): boolean =>
    state.createTest.subjectConfigurations.loadingCreateSubject;

export const selectCreateSubjectErrorMessage = (state: RootState): string =>
    state.createTest.subjectConfigurations.craeteSubjectErrorMessage;
