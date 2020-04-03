/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Selectors for subject slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';

/** Application's imports */
import { RootState } from 'store/slices';

export const selectSubjects = (state: RootState) =>
    state.subject.subjects;

export const selectSubSubjects = (state: RootState) =>
    state.subject.subSubjects;

export const selectSubjectLoading = (state: RootState) =>
    state.subject.loading;

export const selectSubjectIdByName = (name: string) =>
    createSelector(
        selectSubjects,
        (subjects) => {
            const subject = subjects.find((subject) => subject.name === name);

            return subject ? subject.id : null;
        },
    );

export const selectSubSubjectIdByName = (name: string) =>
    createSelector(
        selectSubSubjects,
        (subSubjects) => {
            const subSubject = subSubjects.find((subject) => subject.name === name);

            return subSubject ? subSubject.id : null;
        },
    );

export const selectSubjectsNames = createSelector(
    selectSubjects,
    (subjects) => subjects.map(subject => subject.name),
);

export const selectSubSubjectsNames = createSelector(
    selectSubSubjects,
    (subSubjects) => subSubjects.map(subject => subject.name),
);
