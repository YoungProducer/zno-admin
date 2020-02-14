/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 14 February 2020
 *
 * Export function which create FormData for request.
 */

// Application's imports
import { ICreateTestCredentials } from 'store/actionsCreators/createTest';

export const createFormData = ({ tasksList, mainFields }: ICreateTestCredentials) => {
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
