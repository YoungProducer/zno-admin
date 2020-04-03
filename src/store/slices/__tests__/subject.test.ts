/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Test suites for subject slice.
 */

/** External imports */

/** Application's imports */
import subject, {
    addSubjectAction,
    addSubSubjectAction,
    ISubjectInitialState,
} from '../subject';

describe('Subject slice', () => {
    test('addSubjectAction', () => {
        /** Define inital state */
        const initialState = {
            subjects: [],
        } as ISubjectInitialState;

        /** Dispatch action */
        const result = subject(initialState, addSubjectAction({
            id: 'foo',
            name: 'bar',
        }));

        /** Assert result has right value */
        expect(result.subjects).toEqual([{ id: 'foo', name: 'bar' }]);
    });

    test('addSubSubjectAction', () => {
        /** Define inital state */
        const initialState = {
            subSubejcts: [],
        } as ISubjectInitialState;

        /** Dispatch action */
        const result = subject(initialState, addSubSubjectAction({
            id: 'foo',
            name: 'bar',
        }));

        /** Assert result has right value */
        expect(result.subSubejcts).toEqual([{ id: 'foo', name: 'bar' }]);
    });
});
