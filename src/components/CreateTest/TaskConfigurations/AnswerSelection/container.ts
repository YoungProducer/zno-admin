// Created by: Oleksandr Bezrukov
// Creation date: 1 February 2020

// Define types for AnswerSelection component.
// Connect state and actions to component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import { selectTaskBuffer } from 'store/selectors/createTest';
import { setTaskAnswerAction, setAnswersAmountAction } from 'store/slices/createTest';
import { RootState } from 'store/slices';
import { ETaskType } from '../Component';

interface IOwnProps {
    taskType: ETaskType;
}

interface IStateProps {
    answer: number | any[];
    answersAmount: number;
}

interface IDispatchProps {
    setTaskAnswer: (answer: number | any[]) => void;
    setAnswerAmount: (amount: number) => void;
}

export type TAnswerSelectionProps = IOwnProps & IStateProps & IDispatchProps;

export type TAnswerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    ...selectTaskBuffer(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskAnswer: (answer: number | any[]) => dispatch(setTaskAnswerAction(answer)),
    setAnswerAmount: (amount: number) => dispatch(setAnswersAmountAction(amount)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
