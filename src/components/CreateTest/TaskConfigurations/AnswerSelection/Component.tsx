// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component which allow to select right answer for different types of tasks.

// Externals imports
import React from 'react';

// Application's imports
import OneRightAnswer from './OneRightAnswer';
import RelationAnswer from './RelationAnswer';
import TextAnswer from './TextAnswer';
import { TAnswerSelectionProps } from './container';
import { ETaskType } from 'store/slices/createTest';

const Component = ({
    taskType,
    ...store
}: TAnswerSelectionProps) => {

    return (
        <>
            {taskType === ETaskType.ONE_RIGHT && (
                <OneRightAnswer {...store} />
            )}
            {taskType === ETaskType.RELATIONS && (
                <RelationAnswer {...store} />
            )}
            {taskType === ETaskType.TEXT_FIELDS && (
                <TextAnswer {...store} />
            )}
        </>
    );
};

export default Component;
