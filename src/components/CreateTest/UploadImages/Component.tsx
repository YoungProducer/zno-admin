// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to upload task and explanation images.

// External imports
import React, { useState, useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

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
        addTask,
        updateTask,
        amountOfTasks,
        amountWithTaskImage,
        amountWithExplanationImage,
    } = props;

    const [openModal, setOpenModal] = useState<boolean>(false);

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

    const setManyImages = useCallback((images: File[]) => {
        const uploadedAmount = images.length;
        const tasksAmountWithImage = uploadImageType === 'task'
            ? amountWithTaskImage
            : amountWithExplanationImage;
        /**
         * Calculate amount of tasks which must be updated.
         * They must be updated because they are already created
         * and just needed to add images to this tasks.
         */
        const updateAmount = uploadedAmount < amountOfTasks
            ? uploadedAmount
            : amountOfTasks - tasksAmountWithImage;
        /**
         * Calculate amount of tasks which must be added.
         * They must be created because they are not already exist.
         */
        const addAmount = uploadedAmount < amountOfTasks
            ? 0
            : uploadedAmount - updateAmount;

        const arrayToUpdate = images.slice(0, updateAmount);
        const arrayToAdd = images.slice(updateAmount);

        arrayToUpdate.forEach((image, index) => updateTask({
            data: {
                [uploadImageType === 'task' ? 'image' : 'explanationImage']: image,
            },
            where: {
                id: tasksAmountWithImage + index,
            },
        }));

        addTask(arrayToAdd.map(image => ({
            [uploadImageType === 'task' ? 'image' : 'explanationImage']: image,
        })));
    }, [
        uploadImageType,
        amountOfTasks,
        amountWithTaskImage,
        amountWithExplanationImage,
    ]);

    const onDropCallback = useCallback((acceptedFiles: File[]) =>
        !multiple
            ? setImage(acceptedFiles[0])
            : setManyImages(acceptedFiles),
        [multiple]);

    const handleOpenModalMultiple = (type: TUploadImageType) => {
        setOpenModal(true);
        setMultiple(true);
        setUploadImageType(type);
    };

    return {
        handleOpenModalMultiple,
        imageType: {
            value: uploadImageType,
            set: setUploadImageType,
        },
        multiple: {
            value: multiple,
            set: setMultiple,
        },
        modal: {
            open: openModal,
            set: setOpenModal,
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
        modal,
        handleOpenModalMultiple,
    } = useUploadImageFields(props);

    const handleOpenModal = () => modal.set(true);
    const handleCloseModal = () => modal.set(false);

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
                            <PopupState variant="popover" popupId="tasks-upload-many-popover">
                                {(popupState) => (
                                    <div>
                                        <IconButton
                                            size='small'
                                            className={classes.iconButton}
                                            {...bindTrigger(popupState)}
                                        >
                                            <MoreVertIcon color='primary'/>
                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    button
                                                    onClick={() => handleOpenModalMultiple('task')}
                                                >
                                                    Завантажити багато
                                                </MenuItem>
                                            </MenuList>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>
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
                            <PopupState variant="popover" popupId="explanations-upload-many-popover">
                                {(popupState) => (
                                    <div>
                                        <IconButton
                                            size='small'
                                            className={classes.iconButton}
                                            {...bindTrigger(popupState)}
                                        >
                                            <MoreVertIcon color='primary'/>
                                        </IconButton>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    button
                                                    onClick={() => handleOpenModalMultiple('task')}
                                                >
                                                    Завантажити багато
                                                </MenuItem>
                                            </MenuList>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>
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
                open={modal.open}
                onClose={handleCloseModal}
                {...uploadImageFields}
            />
        </div>
    );
};

export default Component;
