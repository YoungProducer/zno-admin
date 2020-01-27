import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

// // Custom imports

// // Actions
import { createFetchMeAction } from '../store/actionsCreators/auth/me';
import { getLoggedIn } from '../store/selectors/auth/signin';
import { getEmailAfterSignUp } from '../store/selectors/auth/signup';
import { getMeLoading } from '../store/selectors/auth/me';
import { getRefreshLoading } from '../store/selectors/auth/refresh';

import App from '../App';

const mapStateToProps = (state: any) => ({
    loggedIn: getLoggedIn(state.signin),
    emailAfterSignUp: getEmailAfterSignUp(state.signup),
    authLoading: getMeLoading(state.me) || getRefreshLoading(state.refresh),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchMe: () => dispatch(createFetchMeAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
