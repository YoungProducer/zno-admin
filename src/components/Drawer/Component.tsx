// Created by: Oleksandr Bezrukov
// Cretion date: 27 January 2020

// Component with navigation

import React, { useState } from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.2)',
        backgroundColor: theme.palette.primary.main,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.primary.dark,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    chevron: {
        color: '#fff',
    },
}));

const Component = () => {
    const classes = useStyles({});
    const [open, toggleOpen] = useState<boolean>(true);

    const handleDrawerOpen = () => {
        toggleOpen(true);
    };

    const handleDrawerClose = () => {
        toggleOpen(false);
    };

    const toggleDrawer = () => {
        open ? handleDrawerClose() : handleDrawerOpen();
    };

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            open={open}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleDrawer}>
                    {open
                        ? <ChevronLeftIcon className={classes.chevron}/>
                        : <ChevronRightIcon className={classes.chevron}/>}
                </IconButton>
            </div>
            <Divider />
        </Drawer>
    );
};

export default Component;
