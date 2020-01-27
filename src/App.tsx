import React, { useState, useEffect } from 'react';

import Routes from './components/routes';
import Drawer from './components/Drawer';

interface IApp {
    loggedIn: boolean;
    emailAfterSignUp: string;
    fetchMe: Function;
}

const App = ({
    loggedIn,
    emailAfterSignUp,
    fetchMe,
}: IApp) => {
    useEffect(() => {
        fetchMe({});
    },        [fetchMe]);

    return(
        <>
            <Drawer />
            <Routes
                loggedIn={loggedIn}
                emailAfterSignUp={emailAfterSignUp}
            />
        </>
    );
};

export default App;
