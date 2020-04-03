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

const Component = ({
    taskType,
    ...store
}: TAnswerSelectionProps) => {

    return (
        <>
            {taskType === 'SINGLE' && (
                <OneRightAnswer {...store} />
            )}
            {taskType === 'RELATIONS' && (
                <RelationAnswer {...store} />
            )}
            {taskType === 'TEXT' && (
                <TextAnswer {...store} />
            )}
        </>
    );
};

export default Component;
