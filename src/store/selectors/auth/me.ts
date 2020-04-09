/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 9 April 2020
 *
 * Selectors for 'Me' slice.
 */

/** Application's imports */
import { RootState } from 'store/slices';

export const selectMeLoading = (state: RootState) =>
    state.auth.me.loading;
