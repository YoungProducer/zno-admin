/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Test suites for task slice.
 */

/** Application's imports */
import task, {
    TaskSlice,
    setAnswerAction,
    setAnswersAmountAction,
} from '../task';

describe('Task slice', () => {
    test('setAnswersAmountAction if payload greater than value in state should add new element to array', () => {
        const MOCK_STATE = {
            answersAmount: 1,
            answer: [''],
        } as TaskSlice.State;

        const result = task(MOCK_STATE, setAnswersAmountAction(2));

        expect(result.answer).toEqual(['', '']);
    });

    test('setAnswersAmountAction if payload less than value in state should remove last element of array', () => {
        const MOCK_STATE = {
            answersAmount: 2,
            answer: ['', ''],
        } as TaskSlice.State;

        const result = task(MOCK_STATE, setAnswersAmountAction(1));

        expect(result.answer).toEqual(['']);
    });
});
