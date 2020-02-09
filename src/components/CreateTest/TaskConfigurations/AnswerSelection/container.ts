// Created by: Oleksandr Bezrukov
// Creation date: 1 February 2020

// Define types for AnswerSelection component.
// Connect state and actions to component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import { selectTaskBuffer } from 'store/selectors/createTest';
import { setBufferTaskAnswerAction, setBufferAnswersAmountAction } from 'store/slices/createTest';
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
    setAnswersAmount: (amount: number) => void;
}

export type TAnswerSelectionProps = IOwnProps & IStateProps & IDispatchProps;

export type TAnswerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    ...selectTaskBuffer(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskAnswer: (answer: number | any[]) => dispatch(setBufferTaskAnswerAction(answer)),
    setAnswersAmount: (amount: number) => dispatch(setBufferAnswersAmountAction(amount)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
