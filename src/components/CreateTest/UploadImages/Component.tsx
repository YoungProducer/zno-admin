// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to upload task and explanation images.

// External imports
import React, { useState, useCallback, useMemo } from 'react';
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

const useUploadImageFields = (props: TUploadImagesProps) => {
    const {
        taskImagePreview,
        explanationImagePreview,
        setTaskImage,
        setExplanationImage,
        deleteTaskImage,
        deleteExplanationImage,
    } = props;

    const [multiple, setMultiple] = useState<boolean>(false);

    const [uploadImageType, setUploadImageType] = useState<TUploadImageType>('task');

    const imagePreview = useMemo(() =>
        uploadImageType
            ? taskImagePreview
            : explanationImagePreview,
        [uploadImageType]);

    const setImage = useCallback((image: File) =>
        uploadImageType === 'task'
            ? setTaskImage(image)
            : setExplanationImage(image),
        [uploadImageType]);

    const deleteImage = useCallback(() =>
        uploadImageType === 'task'
            ? deleteTaskImage()
            : deleteExplanationImage(),
        [uploadImageType]);

    const onDropCallback = useCallback((acceptedFiles: File[]) =>
        !multiple
            ? setImage(acceptedFiles[0])
            : null,
        [multiple]);

    return {
        imageType: {
            value: uploadImageType,
            set: setUploadImageType,
        },
        uploadImageFields: {
            imagePreview,
            deleteImage,
            onDropCallback,
            multiple,
        },
    };
};

const Component = (props: TUploadImagesProps) => {
    // Declare and define classes
    const classes = useStyles({});

    const {
        taskImageName,
        taskImagePreview,
        explanationImageName,
        explanationImagePreview,
        deleteTaskImage,
        deleteExplanationImage,
    } = props;

    const {
        imageType,
        uploadImageFields,
    } = useUploadImageFields(props);

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
                                    imageType.set('task');
                                    if (!taskImageName) {
                                        handleOpenModal();
                                    }
                                }}
                            >
                                {taskImageName ? taskImageName : 'Завантажити завдання'}
                            </Button>
                            {taskImagePreview && (
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
                                    imageType.set('explanation');
                                    if (!explanationImageName) {
                                        handleOpenModal();
                                    }
                                }}
                                >
                                {explanationImageName ? explanationImageName : 'Завантажити пояснення'}
                            </Button>
                            {explanationImagePreview && (
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
                    {(taskImagePreview || explanationImagePreview) && (
                        <img width='100%' src={imageType.value === 'task' ? taskImagePreview : explanationImagePreview} />
                    )}
                </Grid>
            </Grid>
            <ImageUploadModal
                open={openModal}
                onClose={handleCloseModal}
                {...uploadImageFields}
            />
        </div>
    );
};

export default Component;
