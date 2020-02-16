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
import { createFormData } from 'utils/createTest';
import {
    loadingCreateTestAction,
    setCreateSubjectErrorMessageAction,
    ITask,
} from 'store/slices/createTest';
import {
    enqueueSnackbarAction,
} from 'store/slices/notifier';
import { IMainFields } from 'components/panels/SubjectConfigurationsPanel/container';

export interface ICreateTestCredentials {
    mainFields: IMainFields;
    tasksList: ITask[];
}

export const fetchCreateTestAction = (credentials: ICreateTestCredentials) => async (dispatch: Dispatch<any>) => {
    dispatch(loadingCreateTestAction(true));

    const data = await createFormData(credentials);

    return await api.createTest(data)
        .then(response => {
            if (response.status !== 200) {
                dispatch(loadingCreateTestAction(false));
                throw Error(response.statusText);
            }

            dispatch(loadingCreateTestAction(false));
            dispatch(enqueueSnackbarAction({
                message: 'Тест успішно створено',
                options: {
                    key: 'SuccessCreateTest',
                    variant: 'success',
                },
            }));

            return response.data;
        })
        .then(data => console.log(data))
        .catch(error => {
            dispatch(setCreateSubjectErrorMessageAction(error.message));
            dispatch(loadingCreateTestAction(false));
        });
};
