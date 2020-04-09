/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Combine slice related to auth
 * and export all actions.
 */

/** External imports */
import { combineReducers } from '@reduxjs/toolkit';

/** Application's imports */
import signin from './signin';
import me from './me';

export * from './signin';
export * from './me';

export default combineReducers({
    signin,
    me,
});
