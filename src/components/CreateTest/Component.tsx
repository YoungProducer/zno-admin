// Created by: Oleksandr Bezrukov
// Creation date: 30 January 2020

// External imports
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import TaskConfigurations from './TaskConfigurations';
import UploadImages from './UploadImages';
import CreateTestActions from './CreateTestActions';
import { TCreateTestProps } from './container';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: `100%`,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
}));

const Component = () => {
    // Declare and define classes.
    const classes = useStyles({});

    return (
        <Paper
            elevation={3}
            className={classes.root}
        >
            <Typography
                variant='h4'
                color='secondary'
                className={classes.title}
            >
                Створення завдань та тесту
            </Typography>
            <TaskConfigurations />
            <UploadImages />
            <CreateTestActions />
        </Paper>
    );
};

export default Component;
