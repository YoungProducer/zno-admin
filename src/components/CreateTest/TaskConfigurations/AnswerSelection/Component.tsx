// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component which allow to select right answer for different types of tasks.

// Externals imports
import React from 'react';

// Application's imports
import OneRightAnswer from './OneRightAnswer';
import RelationAnswer from './RelationAnswer';
import TextAnswer from './TextAnswer';
import { ETaskType } from '../Component';

interface IAnswerSelectionProps {
    taskType: ETaskType;
}

const Component = ({
    taskType,
}: IAnswerSelectionProps) => {

    return (
        <>
            {taskType === ETaskType.ONE_RIGHT && (
                <OneRightAnswer />
            )}
            {taskType === ETaskType.RELATIONS && (
                <RelationAnswer />
            )}
            {taskType === ETaskType.TEXT_FIELDS && (
                <TextAnswer />
            )}
        </>
    );
};

export default Component;
