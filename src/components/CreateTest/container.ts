// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

// Define main interfaces and types related to CreateTest component.
// Create function which connect state and actions to the component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    setBufferTaskImageAction,
    setBufferExplanationImageAction,
    deleteBufferTaskImageAction,
    deleteBufferExplanationImageAction,
} from 'store/slices/createTest';

// Props which component get from parent
interface IOwnProps {}

// Props(actions) which component can dispatch
interface IDispatchProps {
    setTaskImage: (file: File) => void;
    setExplanationImage: (file: File) => void;
    deleteTaskImage: () => void;
    deleteExplanationImage: () => void;
}

// Create type for CreateTest component which contain all props pushed to this component
export type TCreateTestProps = IOwnProps & IDispatchProps;

// Define mapDispatchToProps function
// Connect actions related to this component
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskImage: (file: File) => dispatch(setBufferTaskImageAction(file)),
    setExplanationImage: (file: File) => dispatch(setBufferExplanationImageAction(file)),
    deleteTaskImage: () => dispatch(deleteBufferTaskImageAction()),
    deleteExplanationImage: () => dispatch(deleteBufferExplanationImageAction()),
});

// Create function which connect state and actions to the component
export default connect<{}, IDispatchProps, IOwnProps>(
    null,
    mapDispatchToProps,
);
