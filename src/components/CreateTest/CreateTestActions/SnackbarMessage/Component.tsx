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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TSnackbarMessageProps } from './container';

// Define styles as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        maxWidth: 400,
        minWidth: 344,
    },
    actionRoot: {
        padding: '8px 8px 8px 16px',
        backgroundColor: '#d32f2f',
        display: 'flex',
        justifyContent: 'space-between',
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
    icon: {
        color: '#fff',
    },
    typography: {
        color: '#fff',
    },
    button: {
        minWidth: 130,
    },
    paper: {
        padding: theme.spacing(1),
    },
    contentTypography: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));

const Component = forwardRef(
({
    message,
    key,
    closeSnackbar,
    toggleOpenTasksList,
    hasTasksListError,
    hasSubjectConfigError,
}: TSnackbarMessageProps,
 ref,
) => {
    const classes = useStyles({});

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandClick = () => setExpanded(!expanded);
    const handleCloseClick = () => closeSnackbar(key);

    return (
        <Card className={classes.card} ref={ref}>
            <CardActions classes={{ root: classes.actionRoot }}>
                <Typography
                    variant='subtitle1'
                    className={classes.typography}
                >
                    {message}
                </Typography>
                <div className={classes.icons}>
                    <IconButton
                        size='small'
                        className={classNames(classes.expand, classes.icon, {
                            [classes.expandOpen]: !expanded,
                        })}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton
                        size='small'
                        className={classes.icon}
                        onClick={handleCloseClick}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </CardActions>
            <Collapse in={expanded}>
                <Paper className={classes.paper}>
                    <List>
                        { hasSubjectConfigError && (
                            <ListItem divider>
                                <Typography className={classes.contentTypography}>
                                    Є незаповненні поля у налаштуваннях теста.
                                </Typography>
                            </ListItem>
                        )}
                        { hasTasksListError && (
                            <ListItem divider>
                                <Typography className={classes.contentTypography}>
                                    Деякі завдання заповнені неправильно або їх взагалі не створено.
                                </Typography>
                                <Button
                                    className={classes.button}
                                    onClick={() => {
                                        toggleOpenTasksList();
                                        handleCloseClick();
                                    }}
                                    color='primary'
                                    variant='contained'
                                    disableElevation
                                >
                                    Переглянути
                                </Button>
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Collapse>
        </Card>
    );
});

export default Component;
