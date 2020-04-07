// Created by: Oleksandr Bezrukov
// Creation date: 4 February 2020

/**
 * Display info about current task(images, answers, type).
 * Allow delete task or edit it.
 */

// External imports
import React, { useState, useMemo, useCallback } from 'react';
import MuiButton from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import {
    withStyles,
    makeStyles,
    createStyles,
    Theme,
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles';

// Application's imports
import OneRightAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/OneRightAnswer';
import RelationAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/RelationAnswer';
import TextAnswer from 'components/CreateTest/TaskConfigurations/AnswerSelection/TextAnswer';
import ImageUploadModal, { TUploadImageType } from 'modals/ImageUploadModal';
import { TypeSelector } from 'components/CreateTest/TaskConfigurations/Component';
import { TTaskInfoProps } from './container';
import { TaskType, TaskSlice, ImageType } from 'store/slices/task';

const expPanelTheme = createMuiTheme({
    palette: {
        primary: {
            main: red[300],
            contrastText: '#fff',
        },
    },
});

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

const useUploadImageFields = (props: TTaskInfoProps) => {
    const { updateTask, task } = props;

    const [imageType, setImageType] = useState<TUploadImageType>('task');

    const handleDeleteImage = (type: ImageType) =>
        updateTask({ images: { [type]: null } });

    const handleChangeImage = (type: ImageType, image: File) =>
        updateTask({ images: { [type]: image } });

    const imagePreview = useMemo(() =>
        task.images[imageType] !== null
            ? task.images[imageType].preview
            : '',
        [imageType, task]);

    const setImage = useCallback((image: File) => handleChangeImage(imageType, image),
        [imageType]);

    const deleteImage = useCallback(() => handleDeleteImage(imageType),
        [imageType]);

    const onDropCallback = useCallback((acceptedFiles: File[]) =>
        setImage(acceptedFiles[0]), [imageType]);

    return {
        handleDeleteImage,
        setImageType,
        uploadModalFields: {
            imagePreview,
            setImage,
            deleteImage,
            onDropCallback,
        },
    };
};

const Component = (props: TTaskInfoProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const {
        index,
        updateTask,
        deleteTask,
        task,
        expanded,
        deactivateEditionMode,
        activateEditionMode,
        editionMode,
        onChange,
    } = props;

    const {
        uploadModalFields,
        handleDeleteImage,
        setImageType,
    } = useUploadImageFields(props);

    const [modalOpen, toggleModalOpen] = useState<boolean>(false);
    const handleOpenModal = () => toggleModalOpen(true);
    const handleCloseModal = () => toggleModalOpen(false);

    // Handle change in radio group
    const handleChangeTaskType = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTask({
            type: (event.target as HTMLInputElement).value as TaskType,
        });
    };

    const handleChangeAnswersAmount = (amount: number) =>
        updateTask({ answersAmount: amount });

    const handleChangeAnswer = (payload: TaskSlice.SetAnswerPayload) =>
        updateTask({ answer: payload });

    const {
        type,
        answer,
        answersAmount,
        images,
    } = task;

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
                    <Typography
                        data-testid="task-info-panel-summary-text"
                        // color={error ? 'error' : 'initial'}
                    >
                        {`Завдання №${index + 1}`}
                    </Typography>
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
                                    type === 'SINGLE'
                                    ? 'одна правильна відповідь'
                                        : type === 'RELATIONS'
                                        ? 'відношення'
                                    : 'текстова відповідь'
                                }
                            </Typography>
                            { editionMode && (
                                <TypeSelector
                                    value={type}
                                    onChange={handleChangeTaskType}
                                />
                            )}
                            {type === 'SINGLE' && (
                                <OneRightAnswer
                                    answer={answer}
                                    answersAmount={answersAmount}
                                    setTaskAnswer={handleChangeAnswer}
                                    setAnswersAmount={handleChangeAnswersAmount}
                                />
                            )}
                            {type === 'RELATIONS' && (
                                <RelationAnswer
                                    answer={answer}
                                    answersAmount={answersAmount}
                                    setTaskAnswer={handleChangeAnswer}
                                    setAnswersAmount={handleChangeAnswersAmount}
                                />
                            )}
                            {type === 'TEXT' && (
                                <TextAnswer
                                    answer={answer}
                                    answersAmount={task.answersAmount}
                                    setTaskAnswer={handleChangeAnswer}
                                    setAnswersAmount={handleChangeAnswersAmount}
                                />
                            )}
                        </Grid>
                        <Grid item>
                            <div className={classes.imageWrapper}>
                                <Typography>
                                    Зображення завдання: {!images.task && 'зображення не завантажено.'}
                                </Typography>
                                {
                                    expanded === `panel${task.id}`
                                    && images.task
                                    && <img src={images.task.preview} className={classes.img} />
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
                                            onClick={() => handleDeleteImage('task')}
                                        >
                                            Видалити
                                        </DeclineButton>
                                    </div>
                                )}
                            </div>
                            <div className={classes.imageWrapper}>
                                <Typography>
                                    Зображення пояснення: {!images.explanation && 'зображення не завантажено.'}
                                </Typography>
                                {
                                    expanded === `panel${task.id}`
                                    && images.explanation
                                    && <img src={images.explanation.preview} className={classes.img} />
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
                                            onClick={() => handleDeleteImage('explanation')}
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
                {...uploadModalFields}
            />
        </>
    );
};

export default Component;
