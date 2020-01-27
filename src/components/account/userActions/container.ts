import { connect } from 'react-redux';
import { createFetchUserAction } from '../../../store/actionsCreators/update/user';
import { FetchUserCredentials } from '../../../types/store/actionsCreators/update/user';
import { getUserUpdateLoading } from '../../../store/selectors/update/user';
import { getLogoutLoading } from '../../../store/selectors/auth/logout';
import { createFetchLogoutAction } from '../../../store/actionsCreators/auth/logout';

const mapStateToProps = (state: any) => ({
    userUpdateLoading: getUserUpdateLoading(state.updateUser),
    logoutLoading: getLogoutLoading(state.logout),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUpdateUser: (credentials: FetchUserCredentials) => dispatch(createFetchUserAction(credentials)),
    fetchLogout: () => dispatch(createFetchLogoutAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
