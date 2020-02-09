// Created by: Oleksandr Bezrukov
// Crearion date: 9 February 2020

/**
 * Create async actions which send requests to api endpoints and procces its.
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';

// Application's imports
import api from 'api';
import { ICreateSubjectCredentials } from 'api/types';
import {
    setSubjectsActions,
    loadingSubjectsAction,
    loadingCreateSubjectsAction,
    setCreateSubjectErrorMessageAction,
} from 'store/slices/createTest';

export const fetchGetSubjectsNames = () => async (dispatch: Dispatch<any>) => {
    dispatch(loadingSubjectsAction(true));

    return api.getSubjectsNames()
        .then(response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch(loadingSubjectsAction(false));

            return response.data;
        })
        .then((subjectsNames: string[]) => dispatch(setSubjectsActions(subjectsNames)))
        .catch(error => {
            dispatch(loadingSubjectsAction(false));
            console.log(error);
        });
};

export const fetchCreateSubject = (credentials: ICreateSubjectCredentials) => async (dispatch: Dispatch<any>) => {
    dispatch(loadingCreateSubjectsAction(true));

    return api.createSubject(credentials)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            dispatch(loadingCreateSubjectsAction(false));

            return response.data;
        })
        .then((subjects: any[]) => dispatch(setSubjectsActions(subjects.map(subject => subject.name))))
        .catch(error => {
            dispatch(loadingCreateSubjectsAction(false));
            dispatch(setCreateSubjectErrorMessageAction(error.message));
        });
};
