// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 * The entry point of 'TasksList' component.
 * Connect variables from redux store and actions to the component.
 */

// Application's imports
import Component from './Component';
import container from './container';

/**
 * Connect actions and variables from the store to the component.
 */
export default container(Component);
