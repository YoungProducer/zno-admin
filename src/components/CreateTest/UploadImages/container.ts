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
} from 'store/selectors/task';
import {
    setImageAction,
    deleteImageAction,
    ImageType,
    TaskSlice,
} from 'store/slices/task';
import {
    addTaskAction,
    updateTaskAction,
    TasksListSlice,
} from 'store/slices/tasksList';
import {
    selectTasksAmount,
    selectTasksAmountWithTaskImage,
    selectTasksAmountWithExplanationImage,
} from 'store/selectors/tasksList';
import { RootState } from 'store/slices';

// Props which component get from the parent
interface IOwnProps {}

// Props which component select from the redux store
interface IStateProps {
    imagesPreviews: ReturnType<typeof selectImagesPreviews>;
    imagesNames: ReturnType<typeof selectImagesNames>;
    amountOfTasks: number;
    amountWithTaskImage: number;
    amountWithExplanationImage: number;
}

// Props(actions) which component can dispatch
interface IDispatchToProps {
    addTask: (payload: TasksListSlice.AddPayload) => void;
    updateTask: (payload: TasksListSlice.UpdatePayload) => void;
    setImage: (payload: TaskSlice.SetImagePayload) => void;
    deleteImage: (type: ImageType) => void;
}

// Create type for UploadImages which contain all props pushed to this component
export type TUploadImagesProps = IOwnProps & IStateProps & IDispatchToProps;

// Define mapStateToProps.
// Connect props related to this component
const mapStateToProps = (state: RootState): IStateProps => ({
    imagesPreviews: selectImagesPreviews(state),
    imagesNames: selectImagesNames(state),
    amountOfTasks: selectTasksAmount(state),
    amountWithTaskImage: selectTasksAmountWithTaskImage(state),
    amountWithExplanationImage: selectTasksAmountWithExplanationImage(state),
});

// Define mapDispatchToProps.
// Connect action related to this component
const mapDispatchToProps = (dispatch: any): IDispatchToProps => ({
    addTask: (payload: TasksListSlice.AddPayload) => dispatch(addTaskAction(payload)),
    updateTask: (payload: TasksListSlice.UpdatePayload) => dispatch(updateTaskAction(payload)),
    setImage: (payload: TaskSlice.SetImagePayload) => dispatch(setImageAction(payload)),
    deleteImage: (type: ImageType) => dispatch(deleteImageAction(type)),
});

// Function to connect state and actions to component
export default connect<IStateProps, IDispatchToProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
