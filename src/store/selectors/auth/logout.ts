/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Selectors for 'Logout' slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectLogoutLoading = (state: RootState) =>
    state.auth.logout.loading;
