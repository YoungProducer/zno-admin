// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to select count of answers and answers to text type of tasks.

// External imports
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

const Component = () => {
    // Declare and define classes variable
    const classes = useStyles({});

    const [answers, setAnswers] = useState<string[]>([]);
    const handleChangeAnswerById = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        // Extract value from event
        const value = (event.target as HTMLInputElement).value;
        // If index of answers in mapped array equals to index from parametr replace it to value from event.
        // In other case return previous value.
        const newAnswer = answers.map((answer, idx) => idx === index ? value : answer);
        setAnswers(newAnswer);
    };

    const [answersCount, setAnswersCount] = useState<number>(1);
    const handleChangeAnswersCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Extract value from event
        const value = Number((event.target as HTMLInputElement).value);
        // If value lower than 0 equal it to 0
        setAnswersCount(value < 0 ? 0 : value);
    };

    useEffect(() => {
        /**
         * To save previous answers used 'concat' and 'slice' methods.
         * For example:
         * Current array: ['1', '2.5'].
         * Answers count: 1
         * Answers array length: 2
         * New array: ['1'].
         */
        if (answers.length < answersCount) {
            setAnswers(answers.concat(['']));
        } else if (answers.length > answersCount) {
            setAnswers(answers.slice(answersCount));
        }
    },        [answersCount, setAnswers, answers]);

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
                value={answersCount}
                onChange={handleChangeAnswersCount}
            />
            { answers.map((answer, index) => (
                <TextField
                    key={index}
                    className={classes.textField}
                    label={`Відповідь №${index + 1}`}
                    color='secondary'
                    type='text'
                    value={answer}
                    onChange={(event) => handleChangeAnswerById(index, event as React.ChangeEvent<HTMLInputElement>)}
                />
            ))}
        </Grid>
    );
};

export default Component;
