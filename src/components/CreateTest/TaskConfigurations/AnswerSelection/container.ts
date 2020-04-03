// Created by: Oleksandr Bezrukov
// Creation date: 1 February 2020

// Define types for AnswerSelection component.
// Connect state and actions to component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    selectTaskAnswer,
    selectTaskAnswersAmount,
} from 'store/selectors/task';
import {
    setAnswerAction,
    setAnswersAmountAction,
    TaskSlice,
} from 'store/slices/task';
import { RootState } from 'store/slices';

interface IOwnProps {
    taskType: TaskSlice.TaskType;
}

interface IStateProps {
    answer: string[];
    answersAmount: number;
}

interface IDispatchProps {
    setTaskAnswer: (payload: TaskSlice.SetAnswerPayload) => void;
    setAnswersAmount: (amount: number) => void;
}

export type TAnswerSelectionProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

export type TAnswerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    answer: selectTaskAnswer(state),
    answersAmount: selectTaskAnswersAmount(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskAnswer: (payload: TaskSlice.SetAnswerPayload) =>
        dispatch(setAnswerAction(payload)),

    setAnswersAmount: (amount: number) =>
        dispatch(setAnswersAmountAction(amount)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
