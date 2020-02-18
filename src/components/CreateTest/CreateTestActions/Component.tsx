// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

/**
 * Define styles and component.
 * Component related to main action of CreateTest: 'Add task' and 'Create test'.
 */

// External imports
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TCreateTestActionProps } from './container';
import { IImage } from 'store/slices/createTest';
import SnackbarMessage from './SnackbarMessage';

// Define and describe classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start',
            '& button': {
                marginRight: theme.spacing(3),
            },
        },
    },
    button: {
        color: '#fff',
    },
}));

const Component = ({
    taskBuffer,
    tasksList,
    mainFields,
    haveErrors,
    haveErrorFields,
    addTask,
    clearTaskBuffer,
    fetchCreateTest,
    checkTasksFields,
    checkEmptyFields,
    enqueueSnackbar,
    closeSnackbar,
    toggleOpenTasksList,
}: TCreateTestActionProps) => {
    // Declare and define classes variable
    const classes = useStyles({});

    const handleAddTask = () => {
        addTask(taskBuffer);
        clearTaskBuffer();
    };

    const handleCreateTest = () => {
        checkTasksFields();
        checkEmptyFields();
        if (!haveErrors && !haveErrorFields) {
            fetchCreateTest({ tasksList, mainFields });
        } else {
            enqueueSnackbar({
                message: haveErrors && !haveErrorFields ? 'Відсутні деякі данні.' : 'Завдання заповнені неправильно.',
                options: {
                    content: (key, message) => (
                        <SnackbarMessage
                            message={message}
                            key={key}
                            closeSnackbar={closeSnackbar}
                            toggleOpenTasksList={() => toggleOpenTasksList(true)}
                        />
                    ),
                    key: 'create-test-error',
                    variant: 'error',
                    persist: true,
                    preventDuplicate: true,
                //     action: (key) => (
                //         <Button
                //             className={classes.button}
                //             onClick={() => {
                //                 toggleOpenTasksList(true);
                //                 closeSnackbar(key);
                //             }}
                //         >
                //             Переглянути
                //         </Button>
                //     ),
                },
            });
        }
    };

    return (
        <div className={classes.root}>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                onClick={handleAddTask}
            >
                Додати завдання
            </Button>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                data-testid='create-test'
                onClick={handleCreateTest}
            >
                Створити тест
            </Button>
        </div>
    );
};

export default Component;
