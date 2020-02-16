/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Define main interfaces and types for Notifier component.
 * Create function which connect actions and/or variables from the redux store.
 */

// Application's imports
import { connect } from 'react-redux';

// External imports
import { selectNotifications } from 'store/selectors/notifier';
import { removeSnackbarAction, INotification } from 'store/slices/notifier';
import { RootState } from 'store/slices';

/**
 * Props which component get from parents
 */
interface IOwnProps {}

/**
 * Props which component get from the redux store
 */
interface IStateProps {
    notifications: INotification[];
}

/**
 * Props(actions) which component can dispatch
 */
interface IDispatchProps {
    removeSnackbar: (key: number | string) => void;
}

/**
 * Declare type which describe all props pushed to the component.
 */
export type TNotifierProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/**
 * Define function which connect some variables from the store to component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    notifications: selectNotifications(state),
});

/**
 * Define function which connect actions which component can dispatch to redux store.
 */
const mapDispatchProps = (dispatch: any): IDispatchProps => ({
    removeSnackbar: (key: number | string) => dispatch(removeSnackbarAction(key)),
});

/**
 * Export function which connect actions and/or variables from the redux store to component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchProps,
);
