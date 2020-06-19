/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * History for Router.
 */

/** External imports */
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
    basename: '/zno/admin',
});

export default history;
