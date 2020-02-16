// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 * Define all types and interface related to 'CreateTestAction' component.
 * Create function which connect state and actions to the component.
 */

// External imports
import { connect } from 'react-redux';
import { WithSnackbarProps } from 'notistack';

// Application's imports
import { fetchCreateTestAction, ICreateTestCredentials } from 'store/actionsCreators/createTest';
import {
    selectTaskBuffer,
    selectTasksList,
    selectSubjectConfigurationsMainFields,
} from 'store/selectors/createTest';
import { addTaskAction, clearTaskBufferAction } from 'store/slices/createTest';
import { ITaskBufferInitialState, IAddTaskPayload, ITask } from 'store/slices/createTest';
import { RootState } from 'store/slices';
import { IMainFields } from 'components/panels/SubjectConfigurationsPanel/container';

// Props which component get from parent
interface IOwnProps {}

// Props which component get from redux store
interface IStateProps {
    taskBuffer: ITaskBufferInitialState;
    tasksList: ITask[];
    mainFields: IMainFields;
}

// Props(actions) connected to the component
interface IDispatchProps {
    addTask: (payload: IAddTaskPayload) => void;
    clearTaskBuffer: () => void;
    fetchCreateTest: (credentials: ICreateTestCredentials) => void;
}

// Define type of props for 'CreateTestActions' component which describe all props pushed to the component.
export type TCreateTestActionProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/**
 * Define mapStateToProps function.
 * Connect store variables to component.
 */
const mapStateTopProps = (state: RootState): IStateProps => ({
    taskBuffer: selectTaskBuffer(state),
    tasksList: selectTasksList(state),
    mainFields: selectSubjectConfigurationsMainFields(state),
});

/**
 * Define mapDispatchToProps function.
 * Connect actions to component.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    addTask: (payload: IAddTaskPayload) => dispatch(addTaskAction(payload)),
    clearTaskBuffer: () => dispatch(clearTaskBufferAction()),
    fetchCreateTest: (credentials: ICreateTestCredentials) =>
        dispatch(fetchCreateTestAction(credentials)),
});

/**
 * Export function which connect state and actions to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateTopProps,
    mapDispatchToProps,
);
