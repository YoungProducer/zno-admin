// Created by: Oleksandr Bezrukov
// Creation date: 4 February 2020

/**
 * Define main types and interfaces.
 * Define functions to get actions and varibales from redux store.
 * Export function which connect actions and store to 'TasksList' component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import { selectTasksList } from 'store/selectors/createTest';
import { ITask } from 'store/slices/createTest';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    tasksList: ITask[];
}

/**
 * Props(actions) which component can dispatch to store
 */
interface IDispatchProps {}

/**
 * Define type which describe all props which component get from the parent or from the store.
 */
export type TTasksListProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define mapStateToPropsFunction.
 * This function will connect actions to the component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    tasksList: selectTasksList(state),
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
);
