// Created by: Oleskandr Bezrukov
// Creation date: 5 February 2020

/**
 * The entry point of 'TaskInfo' component.
 * Connect actions and variables from the redux store to the component.
 */

// External imports
import Component from './Component';
import container from './container';

/**
 * Connect actions and variables from the store to component.
 */
export default container(Component);
