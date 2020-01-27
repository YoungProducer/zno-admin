import { connect } from 'react-redux';
import { getFoundUsers } from '../../../../../store/selectors/users/searchResult';
import { createFetchFindUserByEmail } from '../../../../../store/actionsCreators/users/findByEmail';
import { FetchUpdateUserRootsCredentials } from '../../../../../types/store/actionsCreators/update/userRoot';
import { createFetchUpdateUserRoots } from '../../../../../store/actionsCreators/update/userRoots';
import { getUpdateUserRootsLoading, getUpdateUserRootsSuccess } from '../../../../../store/selectors/update/userRoots';
import { getFindUserByEmailLoading } from '../../../../../store/selectors/users/findByEmail';

const mapStateToProps = (state: any) => ({
    foundUsers: getFoundUsers(state.usersSearchResult),
    updateUserRootsLoading: getUpdateUserRootsLoading(state.updateUserRoots),
    updateUserRootsSuccess: getUpdateUserRootsSuccess(state.updateUserRoots),
    findUserByEmailLoading: getFindUserByEmailLoading(state.findUserByEmail),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchFindUsersByEmail: (email: string) => dispatch(createFetchFindUserByEmail(email)),
    fetchUpdateUserRoots: (credentials: FetchUpdateUserRootsCredentials) => dispatch(createFetchUpdateUserRoots(credentials)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
