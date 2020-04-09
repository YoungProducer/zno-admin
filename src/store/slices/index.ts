import { combineReducers } from 'redux';

import auth from './auth';
import notifier from './notifier';
import subject from './subject';
import subjectConfig from './subjectConfig';
import task from './task';
import tasksList from './tasksList';
import createTest from './createTest';

const rootReducer = combineReducers({
    auth,
    notifier,
    subject,
    subjectConfig,
    task,
    tasksList,
    createTest,
});

export * from './types';

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
