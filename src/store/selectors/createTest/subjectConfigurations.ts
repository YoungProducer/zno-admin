// Created by: Oleksandr Bezrukov
// Creation date: 9 February 2020

/**
 * Selectors realated to the 'subjectConfigurations' reducer.
 */

// External imports
import { createSelector } from '@reduxjs/toolkit';

// Application's imports
import { RootState } from 'store/slices';
import { IMainFields } from 'components/panels/SubjectConfigurationsPanel/container';
import { ETestTypes, EExamTypes } from 'store/slices/createTest';

export const selectSubjects = (state: RootState): string[] =>
    state.createTest.subjectConfigurations.subjects;

export const selectSubjectsLoading = (state: RootState): boolean =>
    state.createTest.subjectConfigurations.loadingSubjects;

export const selectCreateSubjectLoading = (state: RootState): boolean =>
    state.createTest.subjectConfigurations.loadingCreateSubject;

export const selectCreateSubjectErrorMessage = (state: RootState): string =>
    state.createTest.subjectConfigurations.craeteSubjectErrorMessage;

export const selectSubjectName = (state: RootState): string =>
    state.createTest.subjectConfigurations.subjectName;

export const selectSubSubjectName = (state: RootState): string =>
    state.createTest.subjectConfigurations.subSubjectName;

export const selectTestType = (state: RootState): ETestTypes =>
    state.createTest.subjectConfigurations.testType;

export const selectExamType = (state: RootState): EExamTypes =>
    state.createTest.subjectConfigurations.examType;

export const selectThemeName = (state: RootState): string =>
    state.createTest.subjectConfigurations.themeName;

export const selectSubjectConfigurationsMainFields = createSelector(
    [
        selectSubjectName,
        selectSubSubjectName,
        selectTestType,
        selectExamType,
        selectThemeName,
    ],
    (
        subjectName,
        subSubjectName,
        testType,
        examType,
        themeName,
    ): IMainFields => ({
        subjectName,
        subSubjectName,
        testType,
        examType,
        themeName,
    }),
);
