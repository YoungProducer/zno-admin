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
import { selectTasksList, selectTasksListOpen } from 'store/selectors/tasksList';
import {
    deleteTaskByIdAction,
    setOpenTasksListAction,
    TasksListSlice,
} from 'store/slices/tasksList';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    tasksList: Partial<TasksListSlice.ExtendedTask>[];
    open: boolean;
}

/**
 * Props(actions) which component can dispatch to store
 */
interface IDispatchProps {
    deleteTask: (id: number) => void;
    toggleOpenTasksList: (payload: boolean) => void;
}

/**
 * Define type which describe all props which component get from the parent or from the store.
 */
export type TTasksListProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define mapStateToProps function.
 * This function will connect variables from redux store to the component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    tasksList: selectTasksList(state),
    open: selectTasksListOpen(state),
});

/**
 * Define mapDispatchToProps function.
 * This function will connect actions to the component.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    deleteTask: (id: number) =>
        dispatch(deleteTaskByIdAction(id)),

    toggleOpenTasksList: (payload: boolean) =>
        dispatch(setOpenTasksListAction(payload)),
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
