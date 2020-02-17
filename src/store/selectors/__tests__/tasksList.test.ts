/**
 * Create by: Oleksandr Bezrukov
 * Creation date: 17 February 2020
 *
 * Create test suites for tasksList selectors.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import {
    selectIsHaveErrors,
    selectTasksListOpen,
} from 'store/selectors/createTest';
import { ETaskType } from 'store/slices/createTest';
import { RootState } from 'store/slices';

// Define middlewares
const middlewares = [thunk];

// Create function which mock store
const mockStore = configureMockStore(middlewares);

describe('TasksList selectors', () => {
    test('selectIsHaveErrors when one task have no taskImage', () => {
        // Created mocked store
        const store = mockStore({
            createTest: {
                tasksList: {
                    editionMode: false,
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

        // Define expected value
        const expected: boolean = true;

        // Get result of selector
        const result = selectIsHaveErrors(store.getState() as RootState);

        // Check is result equals to expected value
        expect(result).toEqual(expected);
    });

    test('selectIsHaveErrors if tasks array is empty', () => {
        // Created mocked store
        const store = mockStore({
            createTest: {
                tasksList: {
                    editionMode: false,
                    tasks: [],
                    id: 0,
                },
            },
        });

        // Define expected value
        const expected: boolean = true;

        // Get result of selector
        const result = selectIsHaveErrors(store.getState() as RootState);

        // Check is result exuals to expected value
        expect(result).toEqual(expected);
    });

    test('selectTasksListOpen', () => {
        // Create mocked store
        const store = mockStore({
            createTest: {
                tasksList: {
                    editionMode: false,
                    tasks: [],
                    id: 0,
                    open: false,
                },
            },
        });

        // Define expected value
        const expected: boolean = false;

        // Get result of selector
        const result = selectTasksListOpen(store.getState() as RootState);

        // Check is result equals to expected value
        expect(result).toEqual(expected);
    });
});
