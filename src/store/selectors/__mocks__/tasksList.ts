/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 17 February
 *
 * Create mocked store for tasksList selectors.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import { RootState } from 'store/slices';
import { EExamTypes, ETestTypes, ETaskType } from 'store/slices/createTest';

// Define middlewares
const middlewares = [thunk];

// Create function which mock store
const mockStore = configureMockStore<RootState>(middlewares);

// Created mocked store
const store = mockStore({
    notifier: {
        notifications: [{
            key: 'foo',
            message: 'bar',
            options: {
                key: 'foo',
            },
        }],
    },
    signIn: {
        invalidFields: {
            email: false,
            password: false,
        },
        invalidFieldsMessages: {},
        loading: false,
        loggedIn: false,
    },
    createTest: {
        createTest: {
            errorMessage: '',
            loading: false,
        },
        subjectConfigurations: {
            craeteSubjectErrorMessage: '',
            examType: EExamTypes.TRAINING,
            testType: ETestTypes.THEMES,
            subjectName: '',
            subSubjectName: '',
            themeName: '',
            subjects: [],
            loadingSubjects: false,
            loadingCreateSubject: false,
            withSubSubject: false,
            errorFields: {
                subjectName: false,
                subSubjectName: false,
                themeName: false,
            },
        },
        taskBuffer: {
            answer: 0,
            answersAmount: 1,
            taskType: ETaskType.ONE_RIGHT,
            taskImage: null,
            explanationImage: null,
        },
        tasksList: {
            editionMode: false,
            open: false,
            tasks: [{
                answer: 0,
                answersAmount: 1,
                explanationImage: null,
                taskImage: null,
                taskType: ETaskType.ONE_RIGHT,
                id: 0,
                error: true,
            }],
            id: 0,
        },
    },
});

// Export mocked store
export default store;
