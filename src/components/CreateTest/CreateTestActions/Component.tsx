// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 * Define styles and component.
 * Component related to main action of CreateTest: 'Add task' and 'Create test'.
 */

// External imports
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TCreateTestActionProps } from './container';

// Define and describe classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start',
            '& button': {
                marginRight: theme.spacing(3),
            },
        },
    },
    button: {
        color: '#fff',
    },
}));

const Component = ({
    task,
    tasksList,
    addTask,
    clearTask,
    createTest,
}: TCreateTestActionProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const handleAddTask = () => {
        addTask(task);
        clearTask(false);
    };

    return (
        <div className={classes.root}>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={handleAddTask}
            >
                Додати завдання
            </Button>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                data-testid='create-test'
                onClick={createTest}
            >
                Створити тест
            </Button>
        </div>
    );
};

export default Component;
