// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to upload task and explanation images.

// External imports
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
        display: 'block',
        minWidth: 240,
        marginBottom: theme.spacing(1),
    },
    imageWrapper: {
        width: `100%`,
    },
    buttonsWrapper: {
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start',
            '& button': {
                marginRight: theme.spacing(3),
            },
        },
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

    // Store task image until the task will be added to global list.
    const [bufferTaskImage, setBufferTaskImage] = useState<File>(null);
    const handleSetTaskImage = (file: File) => {
        // Set image to local state
        setBufferTaskImage(file);
        // Set image to global store
        setTaskImage(file);
    };
    const handleDeleteTaskImage = () => {
        // Delete image from local state
        setBufferTaskImage(null);
        // Delete image from global store
        deleteTaskImage();
    };
    // Store explanation image until the task will be added to global list.
    const [bufferExplanationImage, setBufferExplanationImage] = useState<File>();
    const handleSetExplanationImage = (file: File) => {
        // Set image to local state
        setBufferExplanationImage(file);
        // Set image to global store
        setExplanationImage(file);
    };
    const handleDeleteExplanationImage = () => {
        // Delete image from local storage
        setBufferExplanationImage(null);
        // Delete image from global store
        deleteExplanationImage();
    };

    const [uploadImageType, setUploadImageType] = useState<TUploadImageType>('task');

    const [openModal, toggleOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => toggleOpenModal(true);
    const handleCloseModal = () => toggleOpenModal(false);

    return (
        <div className={classes.root}>
            <Typography variant='h4' color='secondary' align='center'>
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
                        <Button
                            className={classes.button}
                            color='secondary'
                            variant='outlined'
                            onClick={() => {
                                setUploadImageType('task');
                                if (!taskImageName) {
                                    handleOpenModal();
                                }
                            }}
                            endIcon={
                                taskImage && (
                                    <CloseIcon
                                        color='primary'
                                        width='24px'
                                        height='24px'
                                        onClick={() => {
                                            handleDeleteTaskImage();
                                            // deleteTaskImage();
                                        }}
                                    />
                                )
                            }
                        >
                            {taskImageName ? taskImageName : 'Завантажити завдання'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.button}
                            color='secondary'
                            variant='outlined'
                            onClick={() => {
                                setUploadImageType('explanation');
                                if (!explanationImageName) {
                                    handleOpenModal();
                                }
                            }}
                        >
                            {explanationImageName ? explanationImageName : 'Завантажити пояснення'}
                            {explanationImage && (
                                <CloseIcon
                                    color='secondary'
                                    width='24px'
                                    height='24px'
                                    onClick={() => {
                                        console.log('click');
                                        deleteExplanationImage();
                                    }}
                                />
                            )}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item className={classes.imageWrapper}>
                    <img width='100%' src={uploadImageType === 'task' ? taskImage : explanationImage} />
                </Grid>
            </Grid>
            <ImageUploadModal
                uploadImageType={uploadImageType}
                setTaskImage={handleSetTaskImage}
                setExplanationImage={handleSetExplanationImage}
                deleteTaskImage={handleDeleteTaskImage}
                deleteExplanationImage={handleDeleteExplanationImage}
                open={openModal}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Component;
