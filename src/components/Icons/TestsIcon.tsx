// Created by: Oleksandr Bezrukov
// Creation date: 29 January 2020

// Test Icon Component

// External imports
import React from 'react';

// Application's imports
import TestIcon from 'public/images/tests.svg';

interface ITestIconProps     {
    width?: string;
    height?: string;
}

const Component = ({ width, height }: ITestIconProps) => (<img src={TestIcon} width={width} height={height}/>);

export default Component;
