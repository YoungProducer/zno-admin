/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 13 February 2020
 *
 * Create test suites for async action and axios request to create a new test.
 */

// External imports
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import api from 'api';
import store from 'store/__mocks__/mockedState';
// import store from 'store';
import { ETaskType, EExamTypes, ETestTypes } from 'store/slices/createTest/index';
import {
    fetchCreateTestAction,
    ICreateTestCredentials,
} from 'store/actionsCreators/createTest/createTest';
import { RootState } from 'store/slices';

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
    /**
     * Init mock adapter.
     */
    const axiosMock = new MockAdapter(api.axiosInstance);

    const mockStore = configureMockStore(
        [thunk],
    );

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

    afterEach(() => {
        axiosMock.reset();
        store.clearActions();
    });

    test('Create form data success', () => {
        axiosMock
            .onPost('/tasks/create')
            .replyOnce(200, 'Success');

        const expectedActions = [{
            type: 'CreateTest/loadingCreateTestAction',
            payload: true,
        }, {
            type: 'CreateTest/loadingCreateTestAction',
            payload: false,
        }, {
            type: 'Notifier/enqueueSnackbarAction',
            payload: {
                message: 'Тест успішно створено',
                options: {
                    key: 'SuccessCreateTest',
                    variant: 'success',
                },
            },
        }];

        return store.dispatch(fetchCreateTestAction(createTestCredentials) as any).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('Create form data with error', () => {
        axiosMock
            .onPost('/tasks/create')
            .reply(400, { error: { message: 'Error' } });

        const expectedActions = [{
            type: 'CreateTest/loadingCreateTestAction',
            payload: true,
        }, {
            type: 'SubjectConfigurations/setCreateSubjectErrorMessageAction',
            payload: 'Request failed with status code 400',
        }, {
            type: 'CreateTest/loadingCreateTestAction',
            payload: false,
        }];

        return store.dispatch(fetchCreateTestAction(createTestCredentials) as any).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
