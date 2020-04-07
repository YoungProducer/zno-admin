/**
 * Created by: Olekandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Selectors for subjectConfig slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';

export const selectSubjectName = (state: RootState) =>
    state.subjectConfig.subjectName;

export const selectSubSubjectName = (state: RootState) =>
    state.subjectConfig.subSubjectName;

export const selectThemeName = (state: RootState) =>
    state.subjectConfig.themeName;

export const selectTestType = (state: RootState) =>
    state.subjectConfig.testType;

export const selectExamType = (state: RootState) =>
    state.subjectConfig.examType;

export const selectWithSubSubject = (state: RootState) =>
    state.subjectConfig.withSubSubject;

export const selectMainFields = createSelector(
    selectSubjectName,
    selectSubSubjectName,
    selectThemeName,
    selectTestType,
    selectExamType,
    selectWithSubSubject,
    (subjectName, subSubjectName, themeName, testType, examType, withSubSubject) => ({
        subjectName, subSubjectName, themeName, testType, examType, withSubSubject,
    }),
);
