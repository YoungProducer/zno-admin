// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 *  The entry point of the 'CreateTestActions' component.
 *  Connect actions and state to the component.
 */

// External imports
import { withSnackbar } from 'notistack';

// Application's imports
import Component from './Component';
import container from './container';

// Connect variables from redux store and action to the component.
export default withSnackbar(container(Component));
