import React, { useState, useEffect } from 'react';

import Routes from 'containers/routes';
import Notifier from 'components/Notifier';

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

    return(
        <>
            <Notifier />
            <Routes />
        </>
    );
};

export default App;
