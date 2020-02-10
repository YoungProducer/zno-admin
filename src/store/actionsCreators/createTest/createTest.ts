/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 10 February 2020
 *
 * Async action which sends api call to create a new test.
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';

// Application's imports
import api from 'api';
import {
    loadingCreateTestAction,
    setCreateSubjectErrorMessageAction,
} from 'store/slices/createTest';

export const fetchCreateTestAction = (credentials: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch(loadingCreateTestAction(true));

    return api.createTest(credentials)
        .then(response => {
            if (response.status !== 200) {
                dispatch(loadingCreateTestAction(false));
                throw Error(response.statusText);
            }

            dispatch(loadingCreateTestAction(false));

            return response.data;
        })
        .then(data => console.log(data))
        .catch(error => {
            dispatch(loadingCreateTestAction(false));
            dispatch(setCreateSubjectErrorMessageAction(error.message));
        });
};
