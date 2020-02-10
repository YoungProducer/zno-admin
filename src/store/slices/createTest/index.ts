// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

/**
 * The entry point of sub-reducer 'CreateTest'.
 * Combine all reducers related to 'CreateTest'.
 * Export all actions.
 */

// External imports
import { combineReducers } from '@reduxjs/toolkit';

// Application's imports
import taskBuffer from './taskBuffer';
import tasksList from './tasksList';
import subjectConfigurations from './subjectConfigurations';
import createTest from './createTest';

// Export actions, interfaces, types, etc.
export * from './taskBuffer';
export * from './tasksList';
export * from './subjectConfigurations';
export * from './createTest';

export default combineReducers({
    taskBuffer,
    tasksList,
    subjectConfigurations,
    createTest,
});
