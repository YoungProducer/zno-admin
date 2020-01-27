import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect, HashRouter } from 'react-router-dom';

import SignUpModal from '../auth/signUp';
import SignInModal from '../auth/signIn';
import Account from '../account';

interface IRoutes {
    loggedIn: boolean;
    emailAfterSignUp: string;
}

const Routes = ({ loggedIn, emailAfterSignUp }: IRoutes) => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact>
                    { emailAfterSignUp !== null
                        ? <Redirect to='/auth/signup' />
                        : <Redirect to='/auth/signin' />}
                </Route>
                <Route path='/auth/signup' component={SignUpModal}>
                    { loggedIn
                        ? <Redirect to='/user/account' />
                            : emailAfterSignUp !== null
                            ? <Redirect to='/auth/signin' />
                        : null}
                </Route>
                <Route path='/auth/signin' component={SignInModal} >
                    { loggedIn && <Redirect to='/user/account' />}
                </Route>
                <Route path='/user/account' component={Account}>
                    { !loggedIn && <Redirect to='/' />}
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default Routes;
