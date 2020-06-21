/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * History for Router.
 */

/** External imports */
import { createBrowserHistory } from 'history';

const mode = process.env.NODE_ENV;
const basename = mode === 'development'
    ? '/'
    : '/zno-admin';

/** Create browser history */
const history = createBrowserHistory({
    basename,
});
export default history;
