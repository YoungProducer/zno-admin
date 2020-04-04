// Created by: Oleksandr Bezrukov
// Creation date: 5 February 2020

/**
 * Define main types and interface for 'TaskInfo' component.
 * Export function which connect actions and variables from the store to this component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    setEditionModeAction,
    updateTaskAction,
    deleteTaskByIdAction,
    TasksListSlice,
} from 'store/slices/tasksList';
import {
    selectTasksListEditionMode,
} from 'store/selectors/tasksList';
import { RootState } from 'store/slices';

/**
 * Props which component get from parent component.
 */
interface IOwnProps {
    task: Partial<TasksListSlice.ExtendedTask>;
    expanded: string | false;
    index: number;
    onChange: (value: string) => any;
}

/**
 * Props which component get from redux store
 */
interface IStateProps {
    editionMode: boolean;
}

/**
 * Props(actions) which component can dispatch
 */
interface IDispatchProps {
    deleteTask: () => void;
    activateEditionMode: () => void;
    deactivateEditionMode: () => void;
    updateTask: (payload: TasksListSlice.UpdatePayload['data']) => void;
}

/**
 * Define type for 'TaskInfo' component which describe all props pushed to the component.
 */
export type TTaskInfoProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define mapStateToProps funciton.
 * This function returns variables from the redux store.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    editionMode: selectTasksListEditionMode(state),
});

/**
 * Define mapDispatchToProps function.
 * Function returns functions which dispatch actions to store.
 */
const mapDispatchToProps = (dispatch: any, ownProps: IOwnProps): IDispatchProps => ({
    deleteTask: () =>
        dispatch(deleteTaskByIdAction(ownProps.task.id)),

    activateEditionMode: () =>
        dispatch(setEditionModeAction(true)),

    deactivateEditionMode: () =>
        dispatch(setEditionModeAction(false)),

    updateTask: (payload: TasksListSlice.UpdatePayload['data']) =>
        dispatch(updateTaskAction({
            data: payload,
            where: { id: ownProps.task.id },
        })),
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
