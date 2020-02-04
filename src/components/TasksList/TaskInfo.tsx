// Created by: Oleksandr Bezrukov
// Creation date: 4 February 2020

/**
 * Display info about current task(images, answers, type).
 * Allow delete task or edit it.
 */

// External imports
import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { ITask } from 'store/slices/createTest';
import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    grid: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    },
    img: {
        width: '90vw',
        [theme.breakpoints.up('lg')]: {
            width: '50vw',
        },
    },
    imageWrapper: {
        borderRadius: 5,
        border: `2px solid #eee`,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '&:last-child': {
            marginBottom: 0,
        },
    },
}));

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

interface ITaskInfoProps {
    task: ITask;
    expanded: string | false;
    index: number;
    onChange: (value: string) => any;
}

const Component = ({
    task,
    expanded,
    index,
    onChange,
}: ITaskInfoProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    return (
        <ExpansionPanel
            square
            expanded={expanded === `panel${task.id}`}
            onChange={onChange(`panel${task.id}`)}
        >
            <ExpansionPanelSummary
                aria-controls={`panel${task.id}d-content`}
                id={`panel${task.id}d-header`}
            >
                <Typography>{`Завдання №${index + 1}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid
                    container
                    className={classes.grid}
                    spacing={2}
                >
                    <Grid item>
                        <Typography>
                            Тип завдання: {
                                task.taskType === ETaskType.ONE_RIGHT
                                ? 'одна правильна відповідь'
                                    : task.taskType === ETaskType.RELATIONS
                                    ? 'відношення'
                                : 'текстова відповідь'
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div className={classes.imageWrapper}>
                            <Typography>
                                Зображення завдання: {!task.taskImage && 'зображення не завантажено.'}
                            </Typography>
                            { task.taskImage && <img src={task.taskImage.preview} className={classes.img} /> }
                        </div>
                        <div className={classes.imageWrapper}>
                            <Typography>
                                Зображення пояснення: {!task.explanationImage && 'зображення не завантажено.'}
                            </Typography>
                            { task.explanationImage && <img src={task.explanationImage.preview} className={classes.img} /> }
                        </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Component;
