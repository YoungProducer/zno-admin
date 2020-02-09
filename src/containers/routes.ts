// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Describe main types and interfaces of Routes component.
 * Create function which connect actions and/or variables from the redux store.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import Routes from 'routes';
import { selectSignInLoggedIn } from 'store/selectors/signin';
import { RootState } from 'store/slices';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    loggedIn: boolean;
}

/**
 * Define type which describe all props pushed to the component.
 */
export type TRoutesProps = IOwnProps & IStateProps;

/**
 * Define function mapStateToProps.
 * This function select some variables from the redux store.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    loggedIn: selectSignInLoggedIn(state),
});

/**
 * Create funciton which connect actions and/or variables from the redux store to the component.
 */
const container = connect<IStateProps, {}, IOwnProps>(
    mapStateToProps,
);

/**
 * Export component with connected actions and/or variables from the redux store to it.
 */
export default container(Routes);
