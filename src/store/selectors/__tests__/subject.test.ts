/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Test suites for subject selectors.
 */

/** External imports */

/** Application's imports */
import {
    selectSubjectIdByName,
    selectSubSubjectIdByName,
    selectSubjectsNames,
    selectSubSubjectsNames,
} from '../subject';
import { RootState } from 'store/slices';

describe('Subject selectors', () => {
    test('selectSubjectIdByName', () => {
        const MOCK_STATE = {
            subject: {
                subjects: [{
                    id: 'foo',
                    name: '123',
                }, {
                    id: 'bar',
                    name: '456',
                }],
            },
        } as RootState;

        const result = selectSubjectIdByName('456')(MOCK_STATE);

        expect(result).toBe('bar');
    });

    test('selectSubSubjectIdByName', () => {
        const MOCK_STATE = {
            subject: {
                subSubjects: [{
                    id: 'foo',
                    name: '123',
                }, {
                    id: 'bar',
                    name: '456',
                }],
            },
        } as RootState;

        const result = selectSubSubjectIdByName('456')(MOCK_STATE);

        expect(result).toBe('bar');
    });

    test('selectSubjectsNames', () => {
        const MOCK_STATE = {
            subject: {
                subjects: [{
                    id: 'foo',
                    name: '123',
                }, {
                    id: 'bar',
                    name: '456',
                }],
            },
        } as RootState;

        const result = selectSubjectsNames(MOCK_STATE);

        expect(result).toEqual(['123', '456']);
    });

    test('selectSubSubjectsNames', () => {
        const MOCK_STATE = {
            subject: {
                subSubjects: [{
                    id: 'foo',
                    name: '123',
                }, {
                    id: 'bar',
                    name: '456',
                }],
            },
        } as RootState;

        const result = selectSubSubjectsNames(MOCK_STATE);

        expect(result).toEqual(['123', '456']);
    });
});
