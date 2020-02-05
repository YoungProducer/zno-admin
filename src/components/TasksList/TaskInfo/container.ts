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
    setTaskAnswerAction,
    setAnswersAmountAction,
} from 'store/slices/createTest';
import { ITask } from 'store/slices/createTest';
import { RootState } from 'store/slices';

/**
 * Props which component get from parent component.
 */
interface IOwnProps {
    task: ITask;
    expanded: string | false;
    index: number;
    onChange: (value: string) => any;
}

/**
 * Props which component get from redux store
 */
interface IStateProps {}

/**
 * Props(actions) which component can dispatch
 */
interface IDispatchProps {
    setTaskAnswer: (payload: number | any[]) => void;
    setAnswersAmount: (payload: number) => void;
}

/**
 * Define type for 'TaskInfo' component which describe all props pushed to the component.
 */
export type TTaskInfoProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define mapDispatchToProps function.
 * Function returns functions which dispatch actions to store.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskAnswer: (payload: number | any[]) => dispatch(setTaskAnswerAction(payload)),
    setAnswersAmount: (payload: number) => dispatch(setAnswersAmountAction(payload)),
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    null,
    mapDispatchToProps,
);
