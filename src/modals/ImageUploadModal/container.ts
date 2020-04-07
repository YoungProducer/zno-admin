// Created by: Oleksandr Bezrukov
// Creation date: 2 February 2020

// Define main interfaces and types for ImageUploadModal component.
// Connect state and action to it.

// External imports
import { connect } from 'react-redux';

// Application's imports

export type TUploadImageType = 'task' | 'explanation';

interface IOwnProps {
    open: boolean;
    multiple?: boolean;
    onClose: () => void;
    imagePreview?: string;
    deleteImage?: () => void;
    onDropCallback: (acceptedFiles: File[]) => void;
}

interface IStateProps {
}

interface IDispatchProps {
}

export type TImageUploadModalProps = IOwnProps & IStateProps & IDispatchProps;

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    // mapStateToProps,
    // mapDispatchToProps,
    null, null,
);
