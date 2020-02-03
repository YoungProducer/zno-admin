// Created by: Oleksandr Bezrukov
// Creation date: 2 February 2020

// Define the main interfaces and types for UploadImage component.
// Connect state and actions to the component.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    selectImagesPreviews,
    selectImagesNames,
} from 'store/selectors/createTest';
import {
    setTaskImageAction,
    setExplanationImageAction,
    deleteTaskImageAction,
    deleteExplanationImageAction,
} from 'store/slices/createTest';
import { RootState } from 'store/slices';

// Props which component get from the parent
interface IOwnProps {}

// Props which component select from the redux store
interface IStateProps {
    taskImage: string;
    explanationImage: string;
    taskImageName: string;
    explanationImageName: string;
}

// Props(actions) which component can dispatch
interface IDispatchToProps {
    setTaskImage: (file: File) => void;
    setExplanationImage: (file: File) => void;
    deleteTaskImage: () => void;
    deleteExplanationImage: () => void;
}

// Create type for UploadImages which contain all props pushed to this component
export type TUploadImagesProps = IOwnProps & IStateProps & IDispatchToProps;

// Define mapStateToProps.
// Connect props related to this component
const mapStateToProps = (state: RootState): IStateProps => ({
    ...selectImagesPreviews(state),
    ...selectImagesNames(state),
});

// Define mapDispatchToProps.
// Connect action related to this component
const mapDispatchToProps = (dispatch: any): IDispatchToProps => ({
    setTaskImage: (file: File) => dispatch(setTaskImageAction(file)),
    setExplanationImage: (file: File) => dispatch(setExplanationImageAction(file)),
    deleteTaskImage: () => dispatch(deleteTaskImageAction()),
    deleteExplanationImage: () => dispatch(deleteExplanationImageAction()),
});

// Function to connect state and actions to component
export default connect<IStateProps, IDispatchToProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
