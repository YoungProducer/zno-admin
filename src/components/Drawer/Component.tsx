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
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
            width: theme.spacing(8) + 1,
        },
    },
    icon: {
        color: '#fff',
    },
    list: {
        backgroundColor: theme.palette.primary.main,
    },
    listItem: {
        justifyContent: 'space-between',
    },
    listItemText: {
        color: '#fff',
        width: 150,
    },
    listItemTextOpen: {
        width: 150,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    listItemTextClose: {
        width: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    listIcon: {
        minWidth: 0,
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
                        ? <ChevronLeftIcon className={classes.icon}/>
                        : <ChevronRightIcon className={classes.icon}/>}
                </IconButton>
            </div>
            {/* <Divider /> */}
            <List className={classes.list}>
                <ListItem button color='primary'>
                    <Fade in={open}>
                        <ListItemText className={classes.listItemText}>
                            Тести
                        </ListItemText>
                    </Fade>
                    <ListItemIcon className={classes.listIcon}>
                        <BuildOutlinedIcon className={classes.icon}/>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Component;
