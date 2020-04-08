// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 * Define all types and interface related to 'CreateTestAction' component.
 * Create function which connect state and actions to the component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import { createTestAction } from 'store/actionsCreators/createTest';
import { selectTaskSliceState } from 'store/selectors/task';
import { selectTasksList } from 'store/selectors/tasksList';
import {
    addTaskAction,
    TasksListSlice,
} from 'store/slices/tasksList';
import {
    clearTaskAction,
    TaskSlice,
} from 'store/slices/task';
import { RootState } from 'store/slices';

// Props which component get from parent
interface IOwnProps {}

// Props which component get from redux store
interface IStateProps {
    task: TaskSlice.State;
    tasksList: Partial<TasksListSlice.ExtendedTask>[];
}

// Props(actions) connected to the component
interface IDispatchProps {
    addTask: (payload: TasksListSlice.AddPayload) => void;
    clearTask: (revoke: boolean) => void;
    createTest: () => void;
}

// Define type of props for 'CreateTestActions' component which describe all props pushed to the component.
export type TCreateTestActionProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/**
 * Define mapStateToProps function.
 * Connect store variables to component.
 */
const mapStateTopProps = (state: RootState): IStateProps => ({
    task: selectTaskSliceState(state),
    tasksList: selectTasksList(state),
});

/**
 * Define mapDispatchToProps function.
 * Connect actions to component.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    addTask: (payload: TasksListSlice.AddPayload) =>
        dispatch(addTaskAction(payload)),

    clearTask: (revoke: boolean) => dispatch(clearTaskAction(revoke)),

    createTest: () => dispatch(createTestAction()),
});

/**
 * Export function which connect state and actions to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateTopProps,
    mapDispatchToProps,
);
