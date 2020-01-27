import { Dispatch } from 'redux';
import {
    connect,
} from 'react-redux';

// Custom imports
import {
    createFetchSignInAction,
} from '../../../store/actionsCreators/auth/signin';

// Types imports
import {
    FetchSignInCredentials,
} from '../../../types/store/actionsCreators';

import { getSignInLoading } from '../../../store/selectors/auth/signin';
import { getEmailAfterSignUp } from '../../../store/selectors/auth/signup';

const mapStateToProps = (state: any) => ({
    userEmail: getEmailAfterSignUp(state.signup),
    loading: getSignInLoading(state.signin),
});

const mapDispatchToProps = (dispatch: any) => ({
    signIn: ({ email, password }: FetchSignInCredentials) => dispatch(createFetchSignInAction({ email, password })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
