/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 10 February 2020
 *
 * Selectors related to 'CreateTest' reducer.
 */

// Application's imports
import { RootState } from 'store/slices';

export const selectCreateTestLoading = (state: RootState) =>
    state.createTest.createTest.loading;

export const selectCreateTestErrorMessage = (state: RootState) =>
    state.createTest.createTest.errorMessage;
