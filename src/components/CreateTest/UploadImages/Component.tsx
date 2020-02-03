// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to upload task and explanation images.

// External imports
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import ImageUploadModal from 'modals/ImageUploadModal';
import { TUploadImageType } from 'modals/ImageUploadModal';
import { TUploadImagesProps } from './container';

// Describe classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2),
        border: `1px solid rgba(0, 0, 0, 0.12)`,
        marginTop: theme.spacing(2),
        width: `100%`,
    },
    container: {
        padding: theme.spacing(2),
    },
    button: {
        minWidth: 240,
    },
    imageWrapper: {
        width: `100%`,
    },
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up('lg')]: {
            marginRight: theme.spacing(3),
        },
    },
    buttonsWrapper: {
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start',
        },
    },
    iconButton: {
        marginLeft: theme.spacing(1),
    },
}));

const Component = ({
    taskImage,
    explanationImage,
    taskImageName,
    explanationImageName,
    setTaskImage,
    setExplanationImage,
    deleteTaskImage,
    deleteExplanationImage,
}: TUploadImagesProps) => {
    // Declare and define classes
    const classes = useStyles({});

    const [uploadImageType, setUploadImageType] = useState<TUploadImageType>('task');

    const [openModal, toggleOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => toggleOpenModal(true);
    const handleCloseModal = () => toggleOpenModal(false);

    return (
        <div className={classes.root}>
            <Typography variant='h4' color='primary' align='center'>
                Завантаження зображень
            </Typography>
            <Grid
                container
                direction='column'
                justify='space-between'
                className={classes.container}
            >
                <Grid
                    item
                    container
                    direction='row'
                    className={classes.buttonsWrapper}
                >
                    <Grid item>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='outlined'
                                onClick={() => {
                                    setUploadImageType('task');
                                    if (!taskImageName) {
                                        handleOpenModal();
                                    }
                                }}
                            >
                                {taskImageName ? taskImageName : 'Завантажити завдання'}
                            </Button>
                            {taskImage && (
                                <IconButton
                                    size='small'
                                    className={classes.iconButton}
                                    onClick={() => {
                                        deleteTaskImage();
                                    }}
                                >
                                    <CloseIcon
                                        color='primary'
                                    />
                                </IconButton>
                            )}
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='outlined'
                                onClick={() => {
                                    setUploadImageType('explanation');
                                    if (!explanationImageName) {
                                        handleOpenModal();
                                    }
                                }}
                                >
                                {explanationImageName ? explanationImageName : 'Завантажити пояснення'}
                            </Button>
                            {explanationImage && (
                                <IconButton
                                size='small'
                                className={classes.iconButton}
                                onClick={() => {
                                    deleteExplanationImage();
                                }}
                                >
                                    <CloseIcon
                                        color='primary'
                                    />
                                </IconButton>
                            )}
                        </div>
                    </Grid>
                </Grid>
                <Grid item className={classes.imageWrapper}>
                    {(taskImage || explanationImage) && (
                        <img width='100%' src={uploadImageType === 'task' ? taskImage : explanationImage} />
                    )}
                </Grid>
            </Grid>
            <ImageUploadModal
                uploadImageType={uploadImageType}
                open={openModal}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Component;
