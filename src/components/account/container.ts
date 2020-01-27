import { connect } from 'react-redux';

import { createFetchLogoutAction } from '../../store/actionsCreators/auth/logout';
import { getUserData } from '../../store/selectors/auth/signin';

const mapStateToProps = (state: any) => ({
    user: getUserData(state.signin),
});

export default connect(
    mapStateToProps,
    null,
);
