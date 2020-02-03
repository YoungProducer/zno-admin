// Created by: Oleksandr Bezrukov
// Creation date: 30 January 2020

// External imports
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import TaskConfigurations from './TaskConfigurations';
import UploadImages from './UploadImages';
import { TCreateTestProps } from './container';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: `100%`,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
}));

const Component = ({
    setTaskImage,
    setExplanationImage,
    deleteTaskImage,
    deleteExplanationImage,
}: TCreateTestProps) => {
    // Declare and define classes.
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

    const [imagesList, setImagesList] = useState<File[]>([]);
    const handleAddImageToList = (file: File) => {
        setImagesList(imagesList.concat(file));
    };

    // const delete

    return (
        <Paper
            elevation={3}
            className={classes.root}
        >
            <Typography
                variant='h4'
                color='secondary'
                className={classes.title}
            >
                Створення завдань та тесту
            </Typography>
            <TaskConfigurations />
            <UploadImages />
        </Paper>
    );
};

export default Component;
