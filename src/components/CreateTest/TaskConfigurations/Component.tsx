// Created by: Oleksandr Bezrukov
// Creation date: 30 January 2020

// Component to configure task select it type and choose right answers.

// External imports
import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import AnswerSelection from './AnswerSelection';
import { TTaskConfigurationProps } from './container';
import { TaskSlice } from 'store/slices/task';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: `100%`,
        display: 'flex',
        justifyContent: 'space-between',
        border: `1px solid rgba(0, 0, 0, 0.12)`,
        padding: theme.spacing(1),
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start',
        },
    },
    answerWrapper: {
        marginLeft: 0,
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(3),
        },
    },
}));

interface ITypeSelector {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: TaskSlice.TaskType;
}

export const TypeSelector = ({
    value,
    onChange,
}: ITypeSelector) => (
    <RadioGroup value={value} onChange={onChange}>
        <FormControlLabel
            value={'SINGLE'}
            control={<Radio color='primary'/>}
            label='Одна правильна відповідь'
        />
        <FormControlLabel
            value={'RELATIONS'}
            control={<Radio color='primary'/>}
            label='Відношення'
        />
        <FormControlLabel
            value={'TEXT'}
            control={<Radio color='primary'/>}
            label='Текстові відповіді'
        />
    </RadioGroup>
);

const Component = ({
    taskType,
    setTaskType,
}: TTaskConfigurationProps) => {
    // Declare and define classes
    const classes = useStyles({});

    // Handle change in radio group
    const handleChangeTaskType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskType((event.target as HTMLInputElement).value as TaskSlice.TaskType);
    };

    return (
        <div className={classes.root}>
            <FormControl
                component='fieldset'
            >
                <FormLabel
                    component='legend'
                    color='primary'
                >
                    Оберіть тип завдання
                </FormLabel>
                <TypeSelector
                    value={taskType}
                    onChange={handleChangeTaskType}
                />
            </FormControl>
            <div className={classes.answerWrapper}>
                <AnswerSelection
                    taskType={taskType as TaskSlice.TaskType}
                />
            </div>
        </div>
    );
};

export default Component;
