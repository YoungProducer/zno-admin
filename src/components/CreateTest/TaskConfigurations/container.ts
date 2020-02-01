// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Define main interfaces and types for 'TaskConfiguration' component.
// Connect selectors and actions to component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    setTaskTypeAction,
} from 'store/slices/createTest/taskBuffer';
import {
    selectTaskBuffer,
} from 'store/selectors/createTest';
import { ETaskType } from './Component';
import { RootState } from 'store/slices';

interface IOwnProps {}

interface IStateProps {
    taskType: ETaskType;
}

interface IDispatchProps {
    setTaskType?: (type: ETaskType) => void;
}

export type TTaskConfigurationProps = IOwnProps & IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    ...selectTaskBuffer(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskType: (type: ETaskType) => dispatch(setTaskTypeAction(type)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
