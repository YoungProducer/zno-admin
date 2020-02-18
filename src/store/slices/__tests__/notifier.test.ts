/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Create test suites for notifier slice.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import {
    enqueueSnackbarAction,
    closeSnackbarAction,
    removeSnackbarAction,
    INotifierInitialState,
} from 'store/slices/notifier';
import store from 'store/__mocks__/mockedState';
// import store from 'store';
import notifier from 'store/slices/notifier';

describe('Notifier slice', () => {
    test('Enqueue snackbar', () => {
        // Define initial state
        const initialState: INotifierInitialState = {
            notifications: [],
        };

        // Define expected state
        const expectedState: INotifierInitialState = {
            notifications: [
                {
                    key: 'bar',
                    message: 'foo',
                    options: {
                        key: 'bar',
                    },
                },
            ],
        };

        // Get result of dispatched action
        const result = notifier(initialState, enqueueSnackbarAction({
            message: 'foo',
            options: {
                key: 'bar',
            },
        }));

        // Check is length of notifications array equals to 1
        expect(result.notifications).toHaveLength(1);

        // Check is result equals to expected state
        expect(result).toEqual(expectedState);
    });

    test('Enqueue snackbar without key parametr', () => {
        // Define initial state
        const initialState: INotifierInitialState = {
            notifications: [],
        };

        // Define expected state
        const expectedState: INotifierInitialState = {
            notifications: [
                {
                    key: 'bar',
                    message: 'foo',
                    options: {
                        key: 'bar',
                    },
                },
            ],
        };

        // Get result of dispatched action
        const result = notifier(initialState, enqueueSnackbarAction({
            message: 'foo',
            options: {},
        }));

        // Check is length of notifications array equals to 1
        expect(result.notifications).toHaveLength(1);

        // Check is generated key is same in notification and in options object
        expect(result.notifications[0].key).toEqual(result.notifications[0].options.key);
    });

    test('Close snackbar by key', () => {
        // Define initial state
        const initialState: INotifierInitialState = {
            notifications: [
                {
                    key: 'bar',
                    message: 'foo',
                    options: {
                        key: 'bar',
                    },
                },
                {
                    key: 'zoo',
                    message: 'foo',
                    options: {
                        key: 'zoo',
                    },
                },
            ],
        };

        // Define expected state
        const expectedState: INotifierInitialState = {
            notifications: [{
                key: 'bar',
                message: 'foo',
                options: {
                    key: 'bar',
                },
                dismissed: true,
            }, {
                key: 'zoo',
                message: 'foo',
                options: {
                    key: 'zoo',
                },
            }],
        };

        // Get result of dispatched action
        const result = notifier(initialState, closeSnackbarAction('bar'));

        // Check is length of notifications array equals to 2
        expect(result.notifications).toHaveLength(2);

        // Check is result of dispatched action equals to expected state
        expect(result).toEqual(expectedState);
    });

    test('Close all snack bars', () => {
        const initialState: INotifierInitialState = {
            notifications: [
                {
                    key: 'bar',
                    message: 'foo',
                    options: {
                        key: 'bar',
                    },
                },
                {
                    key: 'zoo',
                    message: 'foo',
                    options: {
                        key: 'zoo',
                    },
                },
            ],
        };

        const expectedState: INotifierInitialState = {
            notifications: [{
                key: 'bar',
                message: 'foo',
                options: {
                    key: 'bar',
                },
                dismissed: true,
            }, {
                key: 'zoo',
                message: 'foo',
                options: {
                    key: 'zoo',
                },
                dismissed: true,
            }],
        };

        const result = notifier(initialState, closeSnackbarAction());

        expect(result.notifications).toHaveLength(2);

        expect(result).toEqual(expectedState);
    });

    test('Remove snackbar by key', () => {
        const initialState: INotifierInitialState = {
            notifications: [
                {
                    key: 'bar',
                    message: 'foo',
                    options: {
                        key: 'bar',
                    },
                },
                {
                    key: 'zoo',
                    message: 'foo',
                    options: {
                        key: 'zoo',
                    },
                },
            ],
        };

        const expectedState: INotifierInitialState = {
            notifications: [{
                key: 'zoo',
                message: 'foo',
                options: {
                    key: 'zoo',
                },
            }],
        };

        const result = notifier(initialState, removeSnackbarAction('bar'));

        expect(result.notifications).toHaveLength(1);

        expect(result).toEqual(expectedState);
    });

    test(`If each notifier have no the same key as pushed into the function don't change notifications`, () => {
        // Define initial state
        const initialState: INotifierInitialState = {
            notifications: [{
                key: 'zoo',
                message: 'foo',
                options: {
                    key: 'zoo',
                },
            }],
        };

        // Define expected state
        const expectedState: INotifierInitialState = {
            notifications: [{
                key: 'zoo',
                message: 'foo',
                options: {
                    key: 'zoo',
                },
            }],
        };

        // Get result of executed action
        const result = notifier(initialState, closeSnackbarAction('bar'));

        // Check is notifications array in result has length 1
        expect(result.notifications).toHaveLength(1);

        // Check is result equals to expected state
        expect(result).toEqual(expectedState);
    });

    test('Close snackbar by key if notifications array is empty', () => {
        // Define initial state
        const initialState: INotifierInitialState = {
            notifications: [],
        };

        // Get result of executed action
        const result = notifier(initialState, closeSnackbarAction('random-key'));

        // Check is notifications array of result has length 0
        expect(result.notifications).toHaveLength(0);
    });
});
