// Created by: Oleksandr Bezrukov
// Creation date: 27 January 2020

// External imports
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import Drawer from 'components/Drawer';
import CreateTest from 'components/CreateTest';
import SubjectConfigurationsPanel from 'components/panels/SubjectConfigurationsPanel';

const useStyles = makeStyles((theme: Theme) => createStyles({
    panel: {
        width: 300,
        padding: theme.spacing(2),
        height: '100%',
    },
}));

const Component = () => {
    const classes = useStyles({});

    return(
        <HashRouter>
            <Switch>
                <Route exact path='/dashboard'>
                    <Drawer content={
                        <h1>dashboard</h1>
                    }/>
                </Route>
                <Route exact path='/dashboard/create'>
                    <Drawer
                        panel={
                            <SubjectConfigurationsPanel
                                className={classes.panel}
                            />
                        }
                        content={<CreateTest />}
                    />
                </Route>
                <Route exact path='/dashboard/settings'>
                    <Drawer content={
                        <h1>Settings</h1>
                    }/>
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default Component;
