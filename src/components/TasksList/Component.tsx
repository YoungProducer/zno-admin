// Created by: Oleksandr Bezrukov
// Creation date: 3 February

/**
 * Component which show current list of tasks.
 * Allow to delete and edit them.
 */

// External imports
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: '#fff',
        borderRadius: 5,
        border: `2px solid #eee`,
        width: `100%`,
        minHeight: 80,
        padding: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    innerWrapper: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        height: 48,
    },
}));

// tslint:disable-next-line: ter-prefer-arrow-callback
const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Component = () => {
    // Declare and define classes variable
    const classes = useStyles({});

    const [openList, toggleOpenList] = useState<boolean>(false);
    const handleOpenList = () => toggleOpenList(true);
    const handleCloseList = () => toggleOpenList(false);
    const handleToggleList = () => openList ? handleCloseList() : handleOpenList();

    return (
        <Collapse
            in={true}
            className={classes.root}
        >
            <Box className={classes.innerWrapper}>
                <Typography
                    variant='h6'
                    color='primary'
                >
                    Створено 15 завдань
                </Typography>
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    onClick={handleOpenList}
                >
                    Переглянути
                </Button>
            </Box>
            <Dialog
                fullScreen
                open={openList}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseList} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Список створених завдань
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <ListItemText>
                            Номер 1
                        </ListItemText>
                    </ListItem>
                    <Divider />
                </List>
            </Dialog>
        </Collapse>
    );
};

export default Component;
