// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to select count of answers and answers to text type of tasks.

// External imports
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TAnswerProps } from './container';

// Describe classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2),
        paddingRight: theme.spacing(4),
        width: 260,
        '& .MuiGridContainer': {
            width: 260,
        },
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

const Component = ({
    answer,
    setTaskAnswer,
    answersAmount,
    setAnswerAmount,
}: TAnswerProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const handleChangeAnswerById = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        // Extract value from event
        const value = (event.target as HTMLInputElement).value;
        // If index of answers in mapped array equals to index from parametr replace it to value from event.
        // In other case return previous value.
        if (Array.isArray(answer)) {
            const newAnswer = answer.map((ans, idx) => idx === index ? value : answer);
            setTaskAnswer(newAnswer);
        }
    };

    const handleChangeAnswersAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Extract value from event
        const value = Number((event.target as HTMLInputElement).value);
        // If value lower than 0 equal it to 0
        setAnswerAmount(value < 0 ? 0 : value);
    };

    return (
        <Grid
            container
            direction='row'
            spacing={2}
            className={classes.root}
        >
            <TextField
                className={classes.textField}
                label='Кількість відповідей'
                type='number'
                color='secondary'
                value={answersAmount}
                onChange={handleChangeAnswersAmount}
            />
            { Array.isArray(answer) && answer.map((ans, index) => (
                <TextField
                    key={index}
                    className={classes.textField}
                    label={`Відповідь №${index + 1}`}
                    color='secondary'
                    type='text'
                    value={ans}
                    onChange={(event) => handleChangeAnswerById(index, event as React.ChangeEvent<HTMLInputElement>)}
                />
            ))}
        </Grid>
    );
};

export default Component;
