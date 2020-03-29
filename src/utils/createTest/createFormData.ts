/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 14 February 2020
 *
 * Export function which create FormData for request.
 */

// Application's imports
import { ICreateTestCredentials } from 'store/actionsCreators/createTest';
import { ETestTypes, EExamTypes, ETaskType } from 'store/slices/createTest';

export const createFormData = ({ tasksList, mainFields }: ICreateTestCredentials): Promise<FormData> =>
    new Promise((resolve, reject) => {
        try {
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
                    if (image !== null) {
                        data.append(`taskImage${id}`, image, image.name);
                    }
                });

            tasksList
                .map(task => ({ image: task.explanationImage, id: task.id }))
                .forEach(({ image, id }) => {
                    if (image !== null) {
                        data.append(`explanationImage${id}`, image, image.name);
                    }
                });

            const invalidFields =
                Object
                    .entries(mainFields)
                    .reduce((acc, cur) => {
                        if (cur[0] === 'testType' || cur[0] === 'examType') {
                            return { ...acc };
                        }
                        return {
                            ...acc,
                            [cur[0]]: cur[1] === '',
                        };
                    },      {});

            // if (Object.values(invalidFields).some(value => value === true) || invalidTasks.length !== 0 || tasksList.length === 0) {
            //     console.log('reject');
            //     reject({ invalidTasks, invalidFields });
            // }

            const additionalData = tasksList.map(task => ({
                type: task.taskType === ETaskType.ONE_RIGHT
                    ? 'SINGLE'
                        : task.taskType === ETaskType.RELATIONS
                        ? 'RELATIONS'
                    : 'TEXT',
                answer: Array.isArray(task.answer)
                    ? task.answer.map(answer => typeof answer === 'number' ? answer.toString() : answer)
                    : task.answer.toString(),
                id: task.id,
            }));

            if (mainFields.subjectName) {
                data.append('subjectName', mainFields.subjectName);
            }

            if (mainFields.subSubjectName) {
                data.append('subSubjectName', mainFields.subSubjectName);
            }

            if (mainFields.testType === ETestTypes.THEMES) {
                data.append('theme', mainFields.themeName);
            }

            if (mainFields.testType === ETestTypes.EXAM) {
                if (mainFields.examType === EExamTypes.TRAINING) {
                    data.append('training', mainFields.themeName);
                }
                if (mainFields.examType === EExamTypes.PREV_SESSIONS) {
                    data.append('session', mainFields.themeName);
                }
            }

            data.append('answers', JSON.stringify(additionalData));
            // data.append('testConfiguration', JSON.stringify(mainFields));
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
