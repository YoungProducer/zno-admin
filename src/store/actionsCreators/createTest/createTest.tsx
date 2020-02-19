/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 10 February 2020
 *
 * Async action which sends api call to create a new test.
 */

// External imports
import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';

// Application's imports
import api from 'api';
import { createFormData } from 'utils/createTest';
import {
    loadingCreateTestAction,
    setCreateSubjectErrorMessageAction,
    setErrorFieldsAction,
    setErrorTasksAction,
    toggleOpenTasksListAction,
    ITask,
} from 'store/slices/createTest';
import {
    enqueueSnackbarAction,
    closeSnackbarAction,
} from 'store/slices/notifier';
import { IMainFields } from 'components/panels/SubjectConfigurationsPanel/container';
import SnackbarMessage from 'components/CreateTest/CreateTestActions/SnackbarMessage';

export interface ICreateTestCredentials {
    mainFields: IMainFields;
    tasksList: ITask[];
}

export const fetchCreateTestAction = (credentials: ICreateTestCredentials) => async (dispatch: Dispatch<any>) => {
    dispatch(loadingCreateTestAction(true));

    try {
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
    } catch (err) {
        const haveErrors: boolean = err.invalidTasks.length !== 0 || credentials.tasksList.length === 0;
        const haveErrorFields: boolean = Object.values(err.invalidFields).some(value => value === true);

        dispatch(setErrorTasksAction(err.invalidTasks));
        dispatch(setErrorFieldsAction(err.invalidFields));

        dispatch(enqueueSnackbarAction({
            message: haveErrors && !haveErrorFields ? 'Відсутні деякі данні.' : 'Завдання заповнені неправильно.',
            options: {
                content: (key, message) => (
                    <SnackbarMessage
                        message={message}
                        key={key}
                        haveErrors={haveErrors}
                        haveErrorFields={haveErrorFields}
                        closeSnackbar={() => dispatch(closeSnackbarAction(key))}
                        toggleOpenTasksList={() => dispatch(toggleOpenTasksListAction(true))}
                    />
                ),
                key: 'create-test-error',
                variant: 'error',
                persist: true,
                preventDuplicate: true,
            },
        }));
    }
};
