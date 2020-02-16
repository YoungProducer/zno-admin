/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Create test suites for App component.
 */

// External imports
import React from 'react';
import { shallow } from 'enzyme';

// Application's imports
import App from '../App';

describe('App component', () => {
    const requiredProps = {
        loggedIn: false,
        emailAfterSignUp: '',
        fetchMe: jest.fn(),
    };

    test('Is matches snapshot', () => {
        const root = shallow(<App {...requiredProps}/>);

        expect(root).toMatchSnapshot();
    });
});
