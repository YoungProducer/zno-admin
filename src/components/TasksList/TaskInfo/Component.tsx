// Created by: Oleksandr Bezrukov
// Creation date: 4 February 2020

/**
 * Display info about current task(images, answers, type).
 * Allow delete task or edit it.
 */

// External imports
import React, { useState } from 'react';
import MuiButton from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import OneRightAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/OneRightAnswer';
import RelationAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/RelationAnswer';
import TextAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/TextAnswer';
import ImageUploadModal, { TUploadImageType } from 'modals/ImageUploadModal';
import { TypeSelector } from 'components/CreateTest/TaskConfigurations/Component';
import { ITask } from 'store/slices/createTest';
import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';
import { TTaskInfoProps } from './container';

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
    imageActions: {
        padding: theme.spacing(1),
        '& button': {
            marginLeft: 0,
            '&:not(:first-child)': {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));

const DeclineButton = withStyles(theme => ({
    root: {
        backgroundColor: red[500],
        color: theme.palette.getContrastText(red[500]),
        '&:hover': {
            backgroundColor: red[600],
        },
    },
}))(MuiButton);

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

const ExpansionPanelActions = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelActions);

const Component = ({
    task,
    expanded,
    index,
    editionMode,
    onChange,
    changeTaskType,
    changeTaskImage,
    changeExplanationImage,
    deleteTask,
    deleteTaskImage,
    deleteExplanationImage,
    activateEditionMode,
    deactivateEditionMode,
    ...other
}: TTaskInfoProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const [modalOpen, toggleModalOpen] = useState<boolean>(false);
    const handleOpenModal = () => toggleModalOpen(true);
    const handleCloseModal = () => toggleModalOpen(false);

    const [imageType, setImageType] = useState<TUploadImageType>('task');

    // Handle change in radio group
    const handleChangeTaskType = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTaskType((event.target as HTMLInputElement).value as ETaskType);
    };

    const { taskType, answer, answersAmount } = task;

    const handleClickEditButton = () => {
        if (editionMode) {
            deactivateEditionMode();
        } else {
            activateEditionMode();
        }
    };

    return (
        <>
            <ExpansionPanel
                component='li'
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
                            { editionMode && (
                                <TypeSelector
                                    value={task.taskType}
                                    onChange={handleChangeTaskType}
                                />
                            )}
                            {taskType === ETaskType.ONE_RIGHT && (
                                <OneRightAnswer
                                    answer={answer}
                                    answersAmount={answersAmount}
                                    {...other}
                                />
                            )}
                            {taskType === ETaskType.RELATIONS && (
                                <RelationAnswer
                                    answer={answer}
                                    answersAmount={answersAmount}
                                    {...other}
                                />
                            )}
                            {taskType === ETaskType.TEXT_FIELDS && (
                                <TextAnswer
                                    answer={answer}
                                    answersAmount={task.answersAmount}
                                    {...other}
                                />
                            )}
                        </Grid>
                        <Grid item>
                            <div className={classes.imageWrapper}>
                                <Typography>
                                    Зображення завдання: {!task.taskImage && 'зображення не завантажено.'}
                                </Typography>
                                {
                                    expanded === `panel${task.id}`
                                    && task.taskImage
                                    && <img src={task.taskImage.preview} className={classes.img} />
                                }
                                { editionMode && (
                                    <div className={classes.imageActions}>
                                        <MuiButton
                                            color='primary'
                                            variant='outlined'
                                            onClick={() => {
                                                setImageType('task');
                                                handleOpenModal();
                                            }}
                                        >
                                            Змінити
                                        </MuiButton>
                                        <DeclineButton
                                            variant='contained'
                                            disableElevation
                                            onClick={deleteTaskImage}
                                        >
                                            Видалити
                                        </DeclineButton>
                                    </div>
                                )}
                            </div>
                            <div className={classes.imageWrapper}>
                                <Typography>
                                    Зображення пояснення: {!task.explanationImage && 'зображення не завантажено.'}
                                </Typography>
                                {
                                    expanded === `panel${task.id}`
                                    && task.explanationImage
                                    && <img src={task.explanationImage.preview} className={classes.img} />
                                }
                                { editionMode && (
                                    <div className={classes.imageActions}>
                                        <MuiButton
                                            color='primary'
                                            variant='outlined'
                                            onClick={() => {
                                                setImageType('explanation');
                                                handleOpenModal();
                                            }}
                                        >
                                            Змінити
                                        </MuiButton>
                                        <DeclineButton
                                            variant='contained'
                                            disableElevation
                                            onClick={deleteExplanationImage}
                                        >
                                            Видалити
                                        </DeclineButton>
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <MuiButton
                        color='primary'
                        variant='contained'
                        disableElevation
                        onClick={handleClickEditButton}
                    >
                        { editionMode ? 'Закінчити редагування' : 'Редагувати'}
                    </MuiButton>
                    <DeclineButton
                        variant='contained'
                        disableElevation
                        onClick={deleteTask}
                    >
                        Видалити
                    </DeclineButton>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <ImageUploadModal
                open={modalOpen}
                onClose={handleCloseModal}
                uploadImageType={imageType}
                setTaskImage={changeTaskImage}
                setExplanationImage={changeExplanationImage}
                deleteTaskImage={deleteTaskImage}
                deleteExplanationImage={deleteExplanationImage}
                taskImage={task.taskImage}
                explanationImage={task.explanationImage}
            />
        </>
    );
};

export default Component;
