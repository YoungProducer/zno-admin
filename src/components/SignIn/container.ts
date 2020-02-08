// import { Dispatch } from 'redux';
// import {
//     connect,
// } from 'react-redux';

// // Custom imports
// import {
//     createFetchSignInAction,
// } from '../../store/actionsCreators/auth/signin';

// import {
//     fetchSignInAction,
// } from 'store/actionsCreators/signin';

// // Types imports
// import {
//     FetchSignInCredentials,
// } from '../../types/store/actionsCreators';

// import { getSignInLoading } from '../../store/selectors/auth/signin';
// import { getEmailAfterSignUp } from '../../store/selectors/auth/signup';
// import { ISignInCredentials } from 'api/types';

// const mapStateToProps = (state: any) => ({
//     userEmail: getEmailAfterSignUp(state.signup),
//     loading: getSignInLoading(state.signin),
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     signIn: ({ email, password }: ISignInCredentials) => dispatch(fetchSignInAction({ email, password })),
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// );

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
} from 'store/selectors/signin';
import {
    clearSignInInvalidFieldsAction,
    clearSignInInvalidFieldsMessagesAction,
    ISignInInvalidFields,
    ISignInInvalidFieldsMessages,
} from 'store/slices/signin';
import { ISignInCredentials } from 'api/types';

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
    signIn: (credentials: ISignInCredentials) => void;
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
    signIn: (credentials: ISignInCredentials) =>
        dispatch(fetchSignInAction(credentials)),

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
