// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to select answer to relation type of tasks.

// External imports
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import Cell from './Cell';
import { TAnswerProps } from './container';

// Describe styles as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    horizontal: {
        width: 225,
        '& .MuiGrid-container': {
            width: 225,
        },
    },
    vertical: {
        width: 225,
        '& .MuiGrid-container': {
            width: 225,
        },
    },
    vIndecies: {
        width: 16,
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.spacing(1) - 2,
    },
    vIndeciesFirst: {
        marginTop: 21,
    },
}));

const Component = ({
    answer,
    setTaskAnswer,
}: TAnswerProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const handleChangeAnswers = (value: string, hindex: number, vindex: number) => {
        setTaskAnswer({
            elIndex: hindex,
            answer: answer[hindex] === value
                ? ''
                : value,
        });
    };

    return (
        <Grid
            container
            direction='row'
            spacing={1}
            className={classes.vertical}
        >
            {[1, 2, 3, 4].map((vel: number, hindex: number) => (
                <Grid
                    key={hindex}
                    container
                    item
                    spacing={1}
                    className={classes.horizontal}
                >
                    <Typography
                        variant='h5'
                        className={classNames(classes.vIndecies, {
                            [classes.vIndeciesFirst]: hindex === 0,
                        })}
                    >
                        {vel}
                    </Typography>
                    {['А', 'Б', 'В', 'Г', 'Д'].map((hel: string, vindex: number) => {
                        const value = vindex.toString();

                        return (
                            <Grid item key={vindex}>
                                { hindex === 0 && (
                                    <Typography variant='h5' align='center'>
                                        {hel}
                                    </Typography>
                                )}
                                <Cell
                                    selected={answer[hindex] === value}
                                    callback={() => handleChangeAnswers(value, hindex, vindex)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
        </Grid>
    );
};

export default Component;
