// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Modal component to upload images.

// External imports
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';

// Application's imports
import { TImageUploadModalProps } from './container';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    img: {
        minWidth: '45vw',
    },
    uploadArea: {
        borderRadius: 16,
        border: `1px solid ${theme.palette.primary.main}`,
        width: '100%',
        height: 100,
    },
    uploadTitle: {
        lineHeight: '100px',
    },
}));

// Create styles for dialog title
const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
});

// Declare interface for dialog title
export interface IDialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
}

// Connect created styles to MuiDialogTitile component and create new customized component
const DialogTitle = withStyles(styles)((props: IDialogTitleProps) => {
    const { children, classes, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>
                {children}
            </Typography>
        </MuiDialogTitle>
    );
});

// Create styles for dialog content
const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

// Create styles for dialog actions
const DialogActions = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogActions);

const Component = ({
    open,
    onClose,
    multiple,
    previewImage,
    deleteImage,
    onDropCallback,
}: TImageUploadModalProps) => {
    // Declare and define classes
    const classes = useStyles({});

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropCallback,
        multiple: multiple || false,
        accept: 'image/*,.svg',
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='xl'
            aria-labelledby='upload-image-title'
        >
            <DialogTitle id='upload-image-title'>
                Завантаження зображення
            </DialogTitle>
            <DialogContent>
                <DialogContentText color='initial'>
                    Для завантаження доступні тільки зображення з розширенням .svg та в кількості не більше одного.
                    <br />
                    Після завантаження ви одразу побачите попередній вигляд зображення.
                </DialogContentText>
                {previewImage && (
                    <img
                        src={previewImage}
                        className={classes.img}
                    />
                )}
                { multiple && (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={classes.uploadArea}>
                            <Typography
                                variant='h4'
                                color='primary'
                                align='center'
                                className={classes.uploadTitle}
                            >
                                Натисніть тут або перетягніть файли
                            </Typography>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                { !multiple && (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                        >
                            Завантажити
                        </Button>
                    </div>
                )}
                { previewImage && deleteImage && (
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={deleteImage}
                    >
                        Видалити
                    </Button>
                )}
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={onClose}
                >
                    Закрити
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Component;
