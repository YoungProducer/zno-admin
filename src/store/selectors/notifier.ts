/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Create selectors for notifier slice.
 */

// Application's imports
import { RootState } from 'store/slices';

export const selectNotifications = (state: RootState) => state.notifier.notifications;
