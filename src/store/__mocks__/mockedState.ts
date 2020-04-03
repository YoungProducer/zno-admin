/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Create mocked store for test suites.
 */

// External imports
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import { RootState } from 'store/slices';
import rootReducer from 'store/slices';

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
});

// Export mocked store
export default store;
