// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component which render cell for answer selection.

// External imports
import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import cross from 'images/grey-cross.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: 4,
        background: '#eee',
        cursor: 'pointer',
        '& img': {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
    },
}));

interface ICellProps {
    selected: boolean;
    callback: () => void;
}

const Component = ({
    selected,
    callback,
}: ICellProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    return (
        <div
            className={classes.root}
            onClick={callback}
        >
            <Zoom in={selected}>
                <img src={cross}/>
            </Zoom>
        </div>
    );
};

export default Component;
