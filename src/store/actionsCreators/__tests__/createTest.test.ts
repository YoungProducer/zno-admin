/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 13 February 2020
 *
 * Create test suites for async action and axios request to create a new test.
 */

// External imports
import MockAdapter from 'axios-mock-adapter';

// Application's imports
import api from 'api';
import store from '@store/index';
import { loadingCreateTestAction, ITask, ETaskType, EExamTypes, ETestTypes } from 'store/slices/createTest/index';
import {
    fetchCreateTestAction,
    ICreateTestCredentials,
} from 'store/actionsCreators/createTest/createTest';
// import { EExamTypes, ETestTypes } from 'components/panels/SubjectConfigurationsPanel/Component';

jest.mock('utils/createTest', () => {
    return {
        createFormData: jest.fn().mockReturnValue({
            taskImage0: {},
            additionalData: JSON.stringify([
                {
                    type: ETaskType.ONE_RIGHT,
                    answer: 1,
                    id: 0,
                },
            ]),
            testConfiguration: JSON.stringify({
                subjectName: 'Математика',
                subSubjectName: 'Геометрія',
                examType: EExamTypes.TRAINING,
                testType: ETestTypes.THEMES,
                themeName: 'Площини',
            }),
        }),
    };
});

describe('Create test', () => {
    const createTestCredentials: ICreateTestCredentials = {
        mainFields: {
            subjectName: 'Математика',
            subSubjectName: 'Геометрія',
            examType: EExamTypes.TRAINING,
            testType: ETestTypes.THEMES,
            themeName: 'Площини',
        },
        tasksList: [
            {
                answer: 1,
                answersAmount: 1,
                id: 0,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: {
                    preview: 'blob://',
                    lastModified: 321321,
                    name: 'foo.svg',
                    size: 321321,
                    type: 'bar',
                    arrayBuffer: jest.fn(),
                    slice: jest.fn(),
                    stream: jest.fn(),
                    text: jest.fn(),
                } as any,
                explanationImage: null,
            },
        ],
    };

    test('Create form data', () => {
        // store.dispatch(loadingCreateTestAction(true));
        const expected = {
            taskImage0: {},
            additionalData: JSON.stringify([
                {
                    type: ETaskType.ONE_RIGHT,
                    answer: 1,
                    id: 0,
                },
            ]),
            testConfiguration: JSON.stringify({
                subjectName: 'Математика',
                subSubjectName: 'Геометрія',
                examType: EExamTypes.TRAINING,
                testType: ETestTypes.THEMES,
                themeName: 'Площини',
            }),
        };

        store.dispatch(fetchCreateTestAction(createTestCredentials) as any);

        console.log(store.getState());

        // expect(store.getState().)
        // expect(FormData.append).toHaveBeenCalled();
        // expect(1 + 2).toBe(3);
        // expect(createFormData(createTestCredentials)).toEqual(expected);
    });
});
