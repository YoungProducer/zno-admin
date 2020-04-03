// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Define main interfaces and types for 'TaskConfiguration' component.
// Connect selectors and actions to component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    TaskSlice,
    setTaskTypeAction,
} from 'store/slices/task';
import {
    selectTaskType,
} from 'store/selectors/task';
import { RootState } from 'store/slices';

interface IOwnProps {}

interface IStateProps {
    taskType: TaskSlice.TaskType;
}

interface IDispatchProps {
    setTaskType?: (type: TaskSlice.TaskType) => void;
}

export type TTaskConfigurationProps = IOwnProps & IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    taskType: selectTaskType(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskType: (type: TaskSlice.TaskType) =>
        dispatch(setTaskTypeAction(type)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
