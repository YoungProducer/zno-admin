/**
 * Create by: Oleksandr Bezrukov
 * Creation date: 17 February 2020
 *
 * Create test suites for tasksList selectors.
 */

// Application's imports
import store from '../__mocks__/tasksList';
import { selectIsHaveErrors } from 'store/selectors/createTest';

describe('TasksList selectors', () => {
    test('selectIsHaveErrors', () => {
        // Define expected value
        const expected: boolean = true;

        // Get result of selectors
        const result = selectIsHaveErrors(store.getState());

        // Check is result equals to expected value
        expect(result).toEqual(expected);
    });
});
