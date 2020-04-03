import { combineReducers } from 'redux';

import signIn from './signin';
import notifier from './notifier';
import subject from './subject';
import subjectConfig from './subjectConfig';
import task from './task';

const rootReducer = combineReducers({
    signIn,
    notifier,
    subject,
    subjectConfig,
    task,
});

export * from './types';

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
