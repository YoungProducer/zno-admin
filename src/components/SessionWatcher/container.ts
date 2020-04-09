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

interface DispatchProps {
    fetchMe: () => void;
}

export type SessionWatcherProps = DispatchProps;

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    fetchMe: () => dispatch(fetchMeAction()),
});

export default connect<{}, DispatchProps>(
    null,
    mapDispatchToProps,
);
