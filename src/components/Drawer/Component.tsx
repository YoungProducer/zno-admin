// Created by: Oleksandr Bezrukov
// Cretion date: 27 January 2020

// Component with navigation

import React, { useState } from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NavLink, NavLinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';

import TestsIcon from 'components/Icons/TestsIcon';

const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: '#333',
        // ...theme.mixins.toolbar,
        width: `calc(100% - ${theme.spacing(9) + 1}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
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
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    drawerPaper: {
        // borderColor: '#333',
        border: 'none',
    },
    panel: {
        display: 'flex',
        flexGrow: 1,
        minHeight: `calc(100vh - 64px)`,
        padding: theme.spacing(3),
        marginTop: 64,
        borderRight: `1px solid rgba(0,0,0,0.12)`,
    },
    content: {
        width: `100%`,
        display: 'flex',
        flexGrow: 1,
        minHeight: `calc(100vh - 64px)`,
        padding: theme.spacing(3),
        marginTop: 64,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        borderRight: `1px solid rgba(0,0,0,0.12)`,
        // marginLeft: theme.spacing(9) + 1,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    icon: {
        color: '#fff',
        width: 35,
        height: 35,
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
    nested: {
        paddingLeft: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(3),
        color: '#fff',
    },
}));

interface IListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    open: boolean;
    nested: boolean;
    onClick?: () => void;
    classes: any;
}

const ListItemLink = (props: IListItemLinkProps) => {
    const { icon, primary, to, classes, open, nested, onClick } = props;

    return (
        <li>
            <NavLink to={to} onClick={onClick}>
                <ListItem button>
                    <Fade in={open}>
                        <ListItemText
                            className={classNames(classes.listItemText, {
                                [classes.nested]: nested,
                            })}
                        >
                            {primary}
                        </ListItemText>
                    </Fade>
                    {icon && <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>}
                </ListItem>
            </NavLink>
        </li>
    );
};

interface IDrawerProps {
    content: React.ReactNode;
    panel?: React.ReactNode;
}

const Component = ({
    content,
    panel,
}: IDrawerProps) => {
    const classes = useStyles({});
    const [open, toggleOpen] = useState<boolean>(true);
    // Variable related to sublist of 'Tests' list item
    const [openTests, toggleOpenTests] = useState<boolean>(false);

    const handleDrawerOpen = () => {
        toggleOpen(true);
    };

    const handleDrawerClose = () => {
        toggleOpen(false);
    };

    const toggleDrawer = () => {
        open ? handleDrawerClose() : handleDrawerOpen();
    };

    const handleTestsOpen = () => {
        toggleOpenTests(true);
    };

    const handleTestsClose = () => {
        toggleOpenTests(false);
    };

    const toggleTests = () => {
        openTests ? handleTestsClose() : handleTestsOpen();
    };

    return (
        <div className={classes.root}>
            <CssBaseLine />
            <AppBar
                position='fixed'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <NavLink to='/dashboard'>
                        <Typography
                            className={classes.title}
                            variant='h6'
                            color='primary'
                            noWrap
                        >
                            ПІДРУЧНИКИ ТА ПОСІБНИКИ
                        </Typography>
                    </NavLink>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                anchor='left'
                open={open}
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: classNames(classes.drawerPaper, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => {
                        toggleDrawer();
                        handleTestsClose();
                    }}>
                        {open
                            ? <ChevronLeftIcon className={classes.icon}/>
                            : <ChevronRightIcon className={classes.icon}/>}
                    </IconButton>
                </div>
                <List className={classes.list}>
                    <ListItem
                        button
                        color='primary'
                        onClick={() => {
                            handleDrawerOpen();
                            toggleTests();
                        }}
                    >
                            <Fade in={open}>
                                <ListItemText className={classes.listItemText}>
                                    Тести
                                </ListItemText>
                            </Fade>
                            <ListItemIcon className={classes.listIcon}>
                                <TestsIcon width='35px' height='35px' />
                            </ListItemIcon>
                    </ListItem>
                    <Collapse
                        in={openTests && open}
                    >
                        <>
                            <ListItemLink
                                to='/dashboard/create'
                                primary='Створити новий'
                                nested
                                classes={classes}
                                open={open}
                            />
                            <ListItemLink
                                to='/dashboard/edit'
                                primary='Редагувати наявний'
                                nested
                                classes={classes}
                                open={open}
                            />
                            <Divider />
                        </>
                    </Collapse>
                    <ListItemLink
                        to='/dashboard/settings'
                        primary='Налаштування'
                        onClick={() => {
                            handleDrawerOpen();
                        }}
                        icon={<SettingsOutlinedIcon className={classes.icon} />}
                        open={open}
                        nested={false}
                        classes={classes}
                    />
                </List>
            </Drawer>
            { panel && (
                <aside className={classes.panel}>
                    {panel}
                </aside>
            )}
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {content}
            </main>
        </div>
    );
};

export default Component;
