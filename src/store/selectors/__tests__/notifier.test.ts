/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Create test suites for notifier selectors.
 */

// Application's imports
import { selectNotifications  } from '../notifier';
import store from 'store/__mocks__/mockedState';
import { INotification } from 'store/slices/notifier';

describe('Notifier selectors', () => {
    test('Check is notifications selectable', () => {
        // Define expected result of selector
        const expected: INotification[] = [{
            key: 'foo',
            message: 'bar',
            options: {
                key: 'foo',
            },
        }];

        // Get result of selectors
        const result = selectNotifications(store.getState());

        // Check is amount of notifications equal to 1
        expect(result).toHaveLength(1);

        // Check is result equals to expected value
        expect(result).toEqual(expected);
    });
});
