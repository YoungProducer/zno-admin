// Created by: Oleksandr Bezrukov
// Creation date: 3 February

/**
 * Component which show current list of tasks.
 * Allow to delete and edit them.
 */

// External imports
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';

// Application's imports
import TaskInfo from './TaskInfo';
import { TTasksListProps } from './container';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: '#fff',
        borderRadius: 5,
        border: `2px solid #eee`,
        width: `100%`,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    innerWrapper: {
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

const Component = ({
    tasksList,
    deleteTask,
}: TTasksListProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const [tasksAmountString, setTasksAmountString] = useState<string>('');

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [openList, toggleOpenList] = useState<boolean>(false);
    const handleOpenList = () => toggleOpenList(true);
    const handleCloseList = () => toggleOpenList(false);
    const handleToggleList = () => openList ? handleCloseList() : handleOpenList();

    useEffect(() => {
        let lastWord = '';

        if (tasksList.length <= 4) lastWord = 'завдання';
        if (tasksList.length > 4 && tasksList.length <= 20) lastWord = 'завдань';
        if (tasksList.length > 20 && tasksList.length % 10 === 1 || 2 || 3 || 4) lastWord = 'завдання';
        else lastWord = 'завдань';

        setTasksAmountString(`Створено ${tasksList.length} ${lastWord}`);
    },        [tasksList]);

    return (
        <>
            <Collapse
                in={tasksList.length !== 0}
                className={classes.root}
                mountOnEnter
                unmountOnExit
            >
                <Box className={classes.innerWrapper}>
                    <Typography
                        variant='h6'
                        color='primary'
                    >
                        {tasksAmountString}
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
            </Collapse>
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
                    {tasksList.map((task, index) => (
                        <TaskInfo
                            key={index}
                            task={task}
                            index={index}
                            expanded={expanded}
                            onChange={handleChange}
                        />
                    ))}
                </List>
            </Dialog>
        </>
    );
};

export default Component;
