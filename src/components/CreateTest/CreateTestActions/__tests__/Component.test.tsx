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
import { ETaskType } from 'store/slices/createTest/taskBuffer';
import { ETestTypes, EExamTypes } from 'store/slices/createTest';

describe('Create test component', () => {
    const enqueueSnackbar = jest.fn();

    const props: TCreateTestActionProps = {
        enqueueSnackbar,
        addTask: jest.fn(),
        clearTaskBuffer: jest.fn(),
        fetchCreateTest: jest.fn(),
        checkTasksFields: jest.fn(),
        toggleOpenTasksList: jest.fn(),
        closeSnackbar: jest.fn(),
        checkEmptyFields: jest.fn(),
        haveErrorFields: false,
        haveErrors: false,
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
        const root = shallow(<Component {...props}/>);

        expect(root).toMatchSnapshot();
    });
});
