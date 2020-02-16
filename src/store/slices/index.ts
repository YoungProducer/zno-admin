import { combineReducers } from 'redux';

import signIn from './signin';
import notifier from './notifier';

import createTest from './createTest';

const rootReducer = combineReducers({
    createTest,
    signIn,
    notifier,
});

export * from './types';

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
