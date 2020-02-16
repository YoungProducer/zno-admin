/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 14 February 2020
 *
 * Export function which create FormData for request.
 */

// Application's imports
import { ICreateTestCredentials } from 'store/actionsCreators/createTest';
import { ITask } from 'store/slices/createTest';

export const createFormData = ({ tasksList, mainFields }: ICreateTestCredentials): Promise<FormData> =>
    new Promise((resolve, reject) => {
        const data = new FormData();

        // Array of invalid tasks' id
        const invalidTasks: number[] = [];

        tasksList
            .map(task => {
                if (task.taskImage === null) {
                    invalidTasks.push(task.id);
                }
                return { image: task.taskImage, id: task.id };
            })
            .forEach(({ image, id }) => {
                if (invalidTasks) {
                    reject({ invalidTasks, message: 'У деяких завдань відсутнє зображення.' });
                }
                data.append(`taskImage${id}`, image, image.name);
            });

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

        resolve(data);
    });
