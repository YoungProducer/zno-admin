/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Component which handle snackbars.
 */

// External imports
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

// Application's imports
import { TNotifierProps } from './container';

let displayed: (number | string)[] = [];

const Component = ({
    notifications,
    removeSnackbar,
}: TNotifierProps) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id: number | string) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id: number | string) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event: any, reason: any) => {
                    if (options.onClose) {
                        options.onClose(event, reason);
                    }
                },
                onExited: (event: any) => {
                    // removen this snackbar from redux store
                    removeSnackbar(key);
                    removeDisplayed(key);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    },        [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar]);

    return (<></>);
};

export default Component;
