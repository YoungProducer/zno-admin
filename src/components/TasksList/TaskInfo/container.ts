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
    deleteTaskAction,
    changeTaskTypeAction,
    changeTaskAnswerAction,
    changeAnswersAmountAction,
    changeTaskImageAction,
    changeExplanationImageAction,
    activateEditionModeAction,
    deactivateEditionModeAction,
} from 'store/slices/createTest';
import {
    deleteTaskImageAction,
    deleteExplanationImageAction,
} from 'store/slices/createTest/tasksList';
import {
    selectTasksListEditionMode,
} from 'store/selectors/createTest';
import { ITask } from 'store/slices/createTest';
import { RootState } from 'store/slices';
import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';

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
interface IStateProps {
    editionMode: boolean;
}

/**
 * Props(actions) which component can dispatch
 */
interface IDispatchProps {
    deleteTask: () => void;
    deleteTaskImage: () => void;
    deleteExplanationImage: () => void;
    setTaskAnswer: (payload: number | any[]) => void;
    setAnswersAmount: (payload: number) => void;
    changeTaskType: (payload: ETaskType) => void;
    changeTaskImage: (payload: File) => void;
    changeExplanationImage: (payload: File) => void;
    activateEditionMode: () => void;
    deactivateEditionMode: () => void;
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
        dispatch(deleteTaskAction(ownProps.task.id)),

    deleteTaskImage: () =>
        dispatch(deleteTaskImageAction(ownProps.task.id)),

    deleteExplanationImage: () =>
        dispatch(deleteExplanationImageAction(ownProps.task.id)),

    setTaskAnswer: (payload: number | any[]) =>
        dispatch(changeTaskAnswerAction({
            id: ownProps.task.id,
            answer: payload,
        })),

    setAnswersAmount: (payload: number) =>
        dispatch(changeAnswersAmountAction({
            id: ownProps.task.id,
            answersAmount: payload,
        })),

    changeTaskType: (payload: ETaskType) =>
        dispatch(changeTaskTypeAction({
            id: ownProps.task.id,
            type: payload,
        })),

    changeTaskImage: (payload: File) =>
        dispatch(changeTaskImageAction({
            id: ownProps.task.id,
            image: payload,
        })),

    changeExplanationImage: (payload: File) =>
        dispatch(changeExplanationImageAction({
            id: ownProps.task.id,
            image: payload,
        })),

    activateEditionMode: () =>
        dispatch(activateEditionModeAction()),

    deactivateEditionMode: () =>
        dispatch(deactivateEditionModeAction()),
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
