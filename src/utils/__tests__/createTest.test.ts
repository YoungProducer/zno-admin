/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 16 February 2020
 *
 * Create tests suites for function which creates FormData.
 *
 * Enable jsdom to successfully test FormData
 * @jest-environment jsdom
 */

// Application's imports
import { createFormData } from '../createTest';
import { ICreateTestCredentials } from 'store/actionsCreators/createTest';
import { ETestTypes, EExamTypes, ETaskType } from 'store/slices/createTest';

describe('CreateFormData function', () => {
    test('If task image is null throw error', async () => {
        const data: ICreateTestCredentials = {
            mainFields: {
                subjectName: '',
                subSubjectName: '',
                testType: ETestTypes.THEMES,
                examType: EExamTypes.TRAINING,
                themeName: '',
            },
            tasksList: [
                {
                    id: 0,
                    answer: 0,
                    answersAmount: 1,
                    taskType: ETaskType.ONE_RIGHT,
                    taskImage: null,
                    explanationImage: null,
                },
            ],
        };

        createFormData(data)
            .then((done: any) => {})
            .catch((error: any) => {
                expect(error).toEqual({
                    message: 'У деяких завдань відсутнє зображення.',
                    invalidTasks: [0],
                });
            });
    });

    test('If all data filled right resolve formdata', () => {
        const data: ICreateTestCredentials = {
            mainFields: {
                subjectName: '',
                subSubjectName: '',
                testType: ETestTypes.THEMES,
                examType: EExamTypes.TRAINING,
                themeName: '',
            },
            tasksList: [
                {
                    id: 0,
                    answer: 0,
                    answersAmount: 1,
                    taskType: ETaskType.ONE_RIGHT,
                    taskImage: {
                        lastModified: 1231,
                        name: 'foo',
                        preview: 'blob://',
                        size: 312312,
                        type: 'bar',
                        text: jest.fn(),
                        slice: jest.fn(),
                        stream: jest.fn(),
                        arrayBuffer: jest.fn(),
                    },
                    explanationImage: null,
                },
            ],
        };

        createFormData(data)
            .then(done => {
            })
    });
});
