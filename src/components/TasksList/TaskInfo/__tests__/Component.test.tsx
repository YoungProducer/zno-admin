/**
 * Created by: Oleksandr Bezrukov
 * Creation date 17 February
 *
 * Create test suites for TaskInfo component.
 */

// External imports
import React from 'react';
import { shallow } from 'enzyme';

// Application's imports
import Component from '../Component';
import { TTaskInfoProps } from '../container';
import { ETaskType } from 'store/slices/createTest';

describe('TaskInfo component', () => {
    const requiredProps: TTaskInfoProps = {
        activateEditionMode: jest.fn(),
        deactivateEditionMode: jest.fn(),
        changeExplanationImage: jest.fn(),
        changeTaskImage: jest.fn(),
        changeTaskType: jest.fn(),
        deleteExplanationImage: jest.fn(),
        deleteTask: jest.fn(),
        deleteTaskImage: jest.fn(),
        onChange: jest.fn(),
        setAnswersAmount: jest.fn(),
        setTaskAnswer: jest.fn(),
        editionMode: false,
        expanded: false,
        index: 0,
        task: {
            answer: 0,
            answersAmount: 1,
            explanationImage: null,
            taskImage: null,
            id: 0,
            taskType: ETaskType.ONE_RIGHT,
        },
    };

    test('Is matches snapshot', () => {
        const root = shallow(<Component { ...requiredProps }/>);

        expect(root).toMatchSnapshot();
    });
});
