/**
 * Created By: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Container for SessionWatcher component.
 */

/** External imports */
import { connect } from 'react-redux';

/** Application's imports */
import { fetchMeAction } from 'store/actionsCreators/auth';
import { selectLoggedIn } from 'store/selectors/auth';
import { RootState } from 'store/slices';

interface DispatchProps {
    fetchMe: () => void;
}

interface StateProps {
    loggedIn: boolean;
}

export type SessionWatcherProps =
    StateProps
    & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
    loggedIn: selectLoggedIn(state),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    fetchMe: () => dispatch(fetchMeAction()),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
);
