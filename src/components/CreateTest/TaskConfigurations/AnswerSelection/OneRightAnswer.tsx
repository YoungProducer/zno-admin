// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to select right answer for tasks with only one right answer.

// External imports
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import Cell from './Cell';
import { TAnswerProps } from './container';

// Describe styles as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: 200,
        '& .MuiGrid-container': {
            width: 200,
        },
    },
}));

const Component = ({
    answer,
    setTaskAnswer,
}: TAnswerProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    // useEffect(() => {
    //     setTaskAnswer(-1);
    // },        []);
    // const [answer, setAnswer] = useState<number>(-1);

    const handleSetAnswer = (index: number) => {
        setTaskAnswer(index === answer ? -1 : index);
    };

    return (
        <Grid container spacing={1} item className={classes.root}>
            {['A', 'Б', 'В', 'Г', 'Д'].map((el: string, index: number) => (
                <Grid item key={index}>
                    <Typography variant='h5' align='center'>
                        {el}
                    </Typography>
                    <Cell
                        selected={answer === index}
                        callback={() => handleSetAnswer(index)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Component;
