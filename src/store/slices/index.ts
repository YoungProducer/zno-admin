import { combineReducers } from 'redux';

import signIn from './signin';
import notifier from './notifier';

const rootReducer = combineReducers({
    signIn,
    notifier,
});

export * from './types';

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
