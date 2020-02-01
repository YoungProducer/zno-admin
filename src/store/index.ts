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
    serializableCheck: true,
    immutableCheck: true,
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
