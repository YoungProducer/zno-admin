
import { Dispatch, Store } from 'redux';
import {
    connect,
} from 'react-redux';

// Custom imports
import {
    createFetchSignUpAction,
} from '../../../store/actionsCreators/auth/signup';

// Types imports
import {
    FetchSignUpCredentials,
} from '../../../types/store/actionsCreators/auth/signup';

import {
    getSignUpLoading,
    getEmailAfterSignUp,
} from '../../../store/selectors/auth/signup';

const mapStateToProps = (state: any) => ({
    loading: getSignUpLoading(state.signup),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchSignUp: ({ email, password, userName }: FetchSignUpCredentials) => dispatch(createFetchSignUpAction({ email, password, userName })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
