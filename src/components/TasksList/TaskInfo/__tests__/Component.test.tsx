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
import { ETaskType, ITask } from 'store/slices/createTest';

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

    test(`If task property 'error' equals false panel summary text must have initial(black) color`, () => {
        // Define task with error: true
        const task: ITask = {
            answer: 0,
            answersAmount: 1,
            id: 0,
            taskImage: null,
            explanationImage: null,
            taskType: ETaskType.ONE_RIGHT,
        };

        // Get shallow rendered component
        const root = shallow(<Component { ...requiredProps } task={task}/>);

        // Check is typography exists
        expect(root.find(`[data-testid="task-info-panel-summary-text"]`).exists()).toEqual(true);

        // Check is typegraphy has color 'error'
        expect(root.find(`[data-testid="task-info-panel-summary-text"]`).props().color).toEqual('initial');
    });

    test(`If task property 'error' equals true panel summary text must have error(red) color`, () => {
        // Define task with error: true
        const task: ITask = {
            answer: 0,
            answersAmount: 1,
            id: 0,
            taskImage: null,
            explanationImage: null,
            taskType: ETaskType.ONE_RIGHT,
            error: true,
        };

        // Get shallow rendered component
        const root = shallow(<Component { ...requiredProps } task={task}/>);

        // Check is typography exists
        expect(root.find(`[data-testid="task-info-panel-summary-text"]`).exists()).toEqual(true);

        // Check is typegraphy has color 'error'
        expect(root.find(`[data-testid="task-info-panel-summary-text"]`).props().color).toEqual('error');
    });
});
