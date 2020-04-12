// Created by: Oleksandr Bezrukov
// Creation date: 27 January 2020

// External imports
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import PrivateRoute from 'components/PrivateRoute';
import Drawer from 'components/Drawer';
import CreateTest from 'components/CreateTest';
import SubjectConfigurationsPanel from 'components/panels/SubjectConfigurationsPanel';
import SignIn from 'components/SignIn';
import { TRoutesProps } from 'containers/routes';
import history from './history';
import SessionWatcher from 'components/SessionWatcher';

const useStyles = makeStyles((theme: Theme) => createStyles({
    panel: {
        width: 300,
        padding: theme.spacing(2),
        height: '100%',
    },
}));

const Component = ({ loggedIn }: TRoutesProps) => {
    const classes = useStyles({});

    return(
        <Router history={history}>
            <SessionWatcher />
            <Switch>
                <PrivateRoute exact path='/'>
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: '/' },
                        }}
                    />
                </PrivateRoute>
                <Route exact path='/auth/signin'>
                    { loggedIn
                        ? <Redirect to={{
                            pathname: '/dashboard',
                            state: { from: '/auth/signin' },
                        }}/>
                        : <SignIn />
                    }
                </Route>
                <PrivateRoute exact path='/dashboard'>
                    <Redirect to='/dashboard/create'/>
                    {/* <Drawer content={
                        <h1>dashboard</h1>
                    }/> */}
                </PrivateRoute>
                <PrivateRoute exact path='/dashboard/create'>
                    <Drawer
                        panel={
                            <SubjectConfigurationsPanel
                                className={classes.panel}
                            />
                        }
                        content={<CreateTest />}
                    />
                </PrivateRoute>
                <PrivateRoute exact path='/dashboard/settings'>
                    <Drawer content={
                        <h1>Settings</h1>
                    }/>
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default Component;
