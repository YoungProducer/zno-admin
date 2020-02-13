/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 13 February 2020
 *
 * Create test suites for CreateTestActions component.
 */

// Externail imports
import React from 'react';
import { shallow, mount, render } from 'enzyme';

// Application's imports
import Component from '../Component';
import { TCreateTestActionProps } from '../container';
import { EExamTypes, ETestTypes } from '../../../panels/SubjectConfigurationsPanel/Component';
import { ETaskType } from '../../../../store/slices/createTest/taskBuffer';

describe('Create test component', () => {
    const props: TCreateTestActionProps = {
        addTask: jest.fn(),
        clearTaskBuffer: jest.fn(),
        fetchCreateTest: jest.fn(),
        mainFields: {
            subjectName: 'foo',
            subSubjectName: '',
            testType: ETestTypes.THEMES,
            examType: EExamTypes.TRAINING,
            themeName: '',
        },
        taskBuffer: {
            answersAmount: 1,
            taskType: ETaskType.ONE_RIGHT,
            answer: 1,
            taskImage: null,
            explanationImage: null,
        },
        tasksList: [],
    };

    test('to match snapshot', () => {
        const root = render(<Component {...props}/>);

        expect(root).toMatchSnapshot();
    });
});
