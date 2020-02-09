// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Configure store and apply middlewares

// External impors
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// Application's imports
import rootReducer from './slices';

const midlleware = getDefaultMiddleware({
    thunk: true,
    serializableCheck: ({
        ignoredActions: [
            // This actions work with File's. To prevent error about non-serializable values needed to ignore its.
            'TaskBuffer/setBufferTaskImageAction',
            'TaskBuffer/setBufferExplanationImageAction',
            'TasksList/addTaskAction',
            'TasksList/deleteTaskAction',
            'TasksList/changeTaskImageAction',
            'TasksList/changeExplanationImageAction',
        ],
        ignoredPaths: [
            'createTest.taskBuffer.taskImage',
            'createTest.taskBuffer.explanationImage',
            'createTest.tasksList.tasks',
        ],
    }),
    immutableCheck: ({
        ignore: ['createTest'],
    }),
});

const logger = createLogger({
    collapsed: true,
    diff: true,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [...midlleware, logger],
});

export type AppDispatch = typeof store.dispatch;

export default store;
