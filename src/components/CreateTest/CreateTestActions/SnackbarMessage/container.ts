/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 18 February 2020
 *
 * Define main types and interfaces.
 * Define functions to get actions and varibales from redux store.
 * Export function which connect actions and store to 'TasksList' component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import { selectIsHaveErrorFields, selectIsHaveErrors } from 'store/selectors/createTest';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {
    message: React.ReactNode;
    key: string | number;
    haveErrors: boolean;
    haveErrorFields: boolean;
    closeSnackbar: (key: string | number) => void;
    toggleOpenTasksList: () => void;
}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    // haveErrors: boolean;
    // haveErrorFields: boolean;
}

/**
 * Props(actions) which component can dispatch to store
 */
interface IDispatchProps {}

/**
 * Define type which describe all props which component get from the parent or from the store.
 */
export type TSnackbarMessageProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define mapStateToProps function.
 * This function will connect variables from redux store to the component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    // haveErrors: selectIsHaveErrors(state),
    // haveErrorFields: selectIsHaveErrorFields(state),
});

/**
 * Define mapDispatchToProps function.
 * This function will connect actions to the component.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
});

/**
 * Export function which connect actions and variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
