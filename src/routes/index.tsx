// Created by: Oleksandr Bezrukov
// Creation date: 27 January 2020

// External imports
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Application's imports
import Drawer from 'components/Drawer';

const Component = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/dashboard'>
                <Drawer content={
                    <h1>dashboard</h1>
                }/>
            </Route>
            <Route exact path='/dashboard/settings'>
                <Drawer content={
                    <h1>Settings</h1>
                }/>
            </Route>
        </Switch>
    </HashRouter>
);

export default Component;
