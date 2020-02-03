// Created by: Oleksandr Bezrukov
// Creation date: 2 February 2020

// Define main interfaces and types for ImageUploadModal component.
// Connect state and action to it.

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    setTaskImageAction,
    setExplanationImageAction,
    deleteTaskImageAction,
    deleteExplanationImageAction,
} from 'store/slices/createTest';
import {
    selectTaskBuffer,
} from 'store/selectors/createTest';
import { RootState } from 'store/slices';

export type TUploadImageType = 'task' | 'explanation';

interface IOwnProps {
    uploadImageType: TUploadImageType;
    open: boolean;
    onClose: () => void;
}

interface IStateProps {
    taskImage: any;
    explanationImage: any;
}

interface IDispatchProps {
    setTaskImage: (file: File) => void;
    setExplanationImage: (file: File) => void;
    deleteTaskImage: () => void;
    deleteExplanationImage: () => void;
}

export type TImageUploadModalProps = IOwnProps & IStateProps & IDispatchProps;

const mapStateToProps = (state: RootState): IStateProps => ({
    ...selectTaskBuffer(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    setTaskImage: (image: any) => dispatch(setTaskImageAction(image)),
    setExplanationImage: (image: any) => dispatch(setExplanationImageAction(image)),
    deleteTaskImage: () => dispatch(deleteTaskImageAction()),
    deleteExplanationImage: () => dispatch(deleteExplanationImageAction()),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
