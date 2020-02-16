/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Export component with connected action and/or variables from the redux store to it.
 */

// Application's imports
import Component from './Component';
import container from './container';

/**
 * Connect actions and/or variables from the redux store to component.
 */
export default container(Component);
