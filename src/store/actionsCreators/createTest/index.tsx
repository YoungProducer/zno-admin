/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 April 2020
 *
 * Prepare form data for test creating.
 * Handle api request.
 */

/** Extermnal imports */
import React from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

/** Application's imports */
import { RootState } from 'store/slices';
import { ThunkExtraArgument } from 'store';
import {
    setCreateTestLoadingAction,
    setSubjectConfigErrorsAction,
    setTasksListErrorsAction,
    CreateTestSlice,
} from 'store/slices/createTest';
import {
    enqueueSnackbarAction,
    closeSnackbarAction,
} from 'store/slices/notifier';
import { setOpenTasksListAction, clearTasksListAction } from 'store/slices/tasksList';
import { setErrorAction } from 'store/slices/errorHandler';
import {
    selectTasksImages,
    selectExplanationsImages,
    selectTasksList,
} from 'store/selectors/tasksList';
import { selectMainFields } from 'store/selectors/subjectConfig';
import {
    hasSubjectConfigErrors,
    hasTasksListErrors,
} from './hasErrors';
import {
    prepareSubjectConfig,
    prepareAnswers,
    prepareImages,
    PreparedAnswer,
} from './prepare';
import SnackbarMessage from 'components/CreateTest/CreateTestActions/SnackbarMessage';

const appendDataToForm = <T extends {}>(
    formData: FormData,
    dataToAppend: T,
    stringify?: boolean,
    useFileName?: boolean,
    variableName?: string,
): Promise<FormData> =>
    new Promise((resolve, reject) => {
        try {
            const newFormData = formData;

            if (stringify) {
                newFormData.append(variableName || undefined, JSON.stringify(dataToAppend));
            } else {
                Object.entries(dataToAppend).forEach((value) => {
                    if (useFileName) {
                        newFormData.append(
                            value[0],
                            value[1] as string | Blob,
                            (value[1] as File).name);
                    } else {
                        newFormData.append(value[0], value[1] as string | Blob);
                    }
                });
            }

            return resolve(newFormData);
        } catch (err) {
            reject(err);
        }
    });

export const createTestAction = () =>
    async (dispatch: Dispatch<any>, getState: () => RootState, extra: ThunkExtraArgument) => {
        dispatch(setCreateTestLoadingAction(true));

        const { api } = extra;

        const state = getState();
        const mainFields = selectMainFields(state);
        const tasksList = selectTasksList(state);

        const subjectConfigErrors = hasSubjectConfigErrors(mainFields);
        const tasksListErrors = hasTasksListErrors(tasksList);

        if (subjectConfigErrors.hasError) {
            dispatch(setSubjectConfigErrorsAction(subjectConfigErrors as CreateTestSlice.SetSubjectConfigErrorsPayload));
        }

        if (tasksListErrors.hasError) {
            dispatch(setTasksListErrorsAction({ invalidTasks: tasksListErrors.invalidTasks }));
        }

        if (!subjectConfigErrors.hasError
            && !tasksListErrors.hasError
        ) {
            let data = new FormData();

            const tasksImages = selectTasksImages(state);
            const explanationsImages = selectExplanationsImages(state);

            const preparedSubjectConfig = prepareSubjectConfig(mainFields, state);
            const preparedAnswers = prepareAnswers(tasksList);
            const preparedImages = prepareImages(tasksImages, explanationsImages);

            data = await appendDataToForm(data, preparedSubjectConfig);
            data = await appendDataToForm(data, preparedImages.tasks, false, true);
            data = await appendDataToForm(data, preparedImages.explanations, false, true);
            data = await appendDataToForm<PreparedAnswer[]>(
                data,
                preparedAnswers,
                true,
                false,
                'answers',
            );

            return api.createTestSuite(data)
                .then(response => {
                    dispatch(setCreateTestLoadingAction(false));

                    return response.data;
                })
                .then(data => {
                    dispatch(enqueueSnackbarAction({
                        message: 'Тест успішно створено',
                        options: {
                            key: 'SuccessCreateTest',
                            variant: 'success',
                        },
                    }));
                    dispatch(clearTasksListAction());
                })
                .catch((error: AxiosError) => {
                    dispatch(setCreateTestLoadingAction(false));
                    dispatch(setErrorAction(error));
                    dispatch(enqueueSnackbarAction({
                        message: 'Сталась помилка.',
                        options: {
                            key: 'FailureCreateTest',
                            variant: 'success',
                        },
                    }));
                });
        }

        dispatch(setCreateTestLoadingAction(false));
        dispatch(enqueueSnackbarAction({
            message: tasksListErrors.hasError
                    && !subjectConfigErrors.hasError
                        ? 'Відсутні деякі данні.'
                        : 'Завдання заповнені неправильно.',
            options: {
                content: (key, message) => (
                    <SnackbarMessage
                        message={message}
                        key={key}
                        hasSubjectConfigError={subjectConfigErrors.hasError}
                        hasTasksListError={tasksListErrors.hasError}
                        closeSnackbar={() => dispatch(closeSnackbarAction(key))}
                        toggleOpenTasksList={() => dispatch(setOpenTasksListAction(true))}
                    />
                ),
                key: 'FailureCreateTest',
                variant: 'error',
                persist: true,
                preventDuplicate: true,
            },
        }));
    };
