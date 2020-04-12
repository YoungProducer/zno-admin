/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 April 2020
 *
 * Container for Drawer component.
 * Select actions and variables from the redux-store.
 */

/** External imports */
import React from 'react';
import { connect } from 'react-redux';

/** Application's imports */
import { logoutAction } from 'store/actionsCreators/auth';

interface OwnProps {
    content: React.ReactNode;
    panel?: React.ReactNode;
}

interface DispatchProps {
    logout: () => void;
}

export type DrawerProps =
    OwnProps
    & DispatchProps;

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    logout: () => dispatch(logoutAction()),
});

export default connect<{}, DispatchProps, OwnProps>(
    null,
    mapDispatchToProps,
);
