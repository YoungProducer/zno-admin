// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Describe main types and interfaces related to SignIn component.
 * Create function which connect actions and values from the redux store to component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import { RootState } from 'store/slices';
import { fetchSignInAction } from 'store/actionsCreators/signin';
import {
    selectSignInInvalidFields,
    selectSignInInvalidFieldsMessages,
    selectSignInLoading,
    selectSignInIsInvalidCredentials,
} from 'store/selectors/auth/signin';
import {
    clearSignInInvalidFieldsAction,
    clearSignInInvalidFieldsMessagesAction,
    ISignInInvalidFields,
    ISignInInvalidFieldsMessages,
} from 'store/slices/auth/signin';
import { Auth } from 'api/types';

/**
 * Props which component get from the parent.
 */
interface IOwnProps {}

/**
 * Props which component get from the redux store.
 */
interface IStateProps {
    invalidFields: ISignInInvalidFields;
    invalidFieldsMessages: ISignInInvalidFieldsMessages;
    loading: boolean;
    isInvalidCredentials: boolean;
}

/**
 * Props(acitons) which call to the redux store or async actions.
 */
interface IDispatchProps {
    signIn: (paylaod: Auth.SignInPayload) => void;
    clearSignInInvalidFields: () => void;
    clearSignInInvalidFieldsMessages: () => void;
}

/**
 * Define type which describe all props pushed to the component.
 */
export type TSignInProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define function mapStateToProps.
 * This function get some variables from the redux store;
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    invalidFields: selectSignInInvalidFields(state),
    invalidFieldsMessages: selectSignInInvalidFieldsMessages(state),
    loading: selectSignInLoading(state),
    isInvalidCredentials: selectSignInIsInvalidCredentials(state),
});

/**
 * Define function mapDispatchToProps.
 * This function create functions which dispatch some actions.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    signIn: (payload: Auth.SignInPayload) =>
        dispatch(fetchSignInAction(payload)),

    clearSignInInvalidFields: () =>
        dispatch(clearSignInInvalidFieldsAction()),

    clearSignInInvalidFieldsMessages: () =>
        dispatch(clearSignInInvalidFieldsMessagesAction()),
});

/**
 * Export function which connect actions and variables from the redux store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
