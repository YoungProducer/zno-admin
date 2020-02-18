/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 18 February 2020
 *
 * Snackbar action which display large amount of info.
 */

// External imports
import React, { useState, forwardRef } from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Define styles as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        maxWidth: 400,
        minWidth: 344,
    },
    actionRoot: {
        padding: '8px 8px 8px 16px',
        backgroundColor: '#fddc6c',
    },
    icons: {
        marginLeft: 'auto',
    },
    expand: {
        padding: '8px 8px',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

interface ISnackbarMessageProps {
    message: React.ReactNode;
}

const Component = forwardRef(
({
    message,
}: ISnackbarMessageProps,
    ref,
) => {
    const classes = useStyles({});

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card className={classes.card} ref={ref}>
            <CardActions classes={{ root: classes.actionRoot }}>
                <Typography variant='subtitle2'>
                    {message}
                </Typography>
                <div className={classes.icons}>
                    <IconButton
                        className={classNames(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
});

export default Component;
