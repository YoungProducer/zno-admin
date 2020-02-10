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
    ITask,
} from 'store/slices/createTest';
import { IMainFields } from 'components/panels/SubjectConfigurationsPanel/container';

export interface ICreateTestCredentials {
    mainFields: IMainFields;
    tasksList: ITask[];
}

const createFormData = ({ tasksList, mainFields }: ICreateTestCredentials) => {
    const data = new FormData();

    tasksList
        .map(task => ({ image: task.taskImage, id: task.id }))
        .forEach(({ image, id }) => data.append(`taskImage${id}`, image, image.name));

    tasksList
        .map(task => ({ image: task.explanationImage, id: task.id }))
        .forEach(({ image, id }) => {
            if (image !== null) {
                data.append(`explanationImage${id}`, image, image.name);
            }
        });

    const additionalData = tasksList.map(task => ({
        type: task.taskType,
        answer: task.answer,
        id: task.id,
    }));

    data.append('additionalData', JSON.stringify(additionalData));
    data.append('testConfiguration', JSON.stringify(mainFields));

    return data;
};

export const fetchCreateTestAction = (credentials: ICreateTestCredentials) => async (dispatch: Dispatch<any>) => {
    dispatch(loadingCreateTestAction(true));

    const data = createFormData(credentials);

    return api.createTest(data)
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
