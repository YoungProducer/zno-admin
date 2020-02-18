// Created by: Oleksandr Bezrukov
// Creation date: 30 January 2020

// Component to choose types of test and to give name for test.

// External imports
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import AdvancedTextField from 'components/AdvancedTextField';
import { TSubjectConfigurationsPanelProps } from './container';
import { ETestTypes, EExamTypes } from 'store/slices/createTest';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        height: '100%',
    },
    part: {
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: 20,
    },
}));

const Component = ({
    className,
    subjects,
    withSubSubject,
    mainFields,
    errorFields,
    toggleWithSubSubject,
    setSubjectName,
    setSubSubjectName,
    setTestType,
    setExamType,
    setThemeName,
    fetchCreateSubject,
    fetchGetSubjectsNames,
    closeSnackbar,
}: TSubjectConfigurationsPanelProps) => {
    const classes = useStyles({});

    const { subjectName, subSubjectName, testType, examType, themeName } = mainFields;

    // const [withSubSubject, toggleWithSubSubject] = useState<boolean>(false);

    const handleChangeTestType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestType((event.target as HTMLInputElement).value as ETestTypes);
    };

    const handleChangeExamType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExamType((event.target as HTMLInputElement).value as EExamTypes);
    };

    useEffect(() => {
        fetchGetSubjectsNames();
    },        []);

    useEffect(() => {
        setTestType(ETestTypes.THEMES);
        if (!withSubSubject) {
            setSubSubjectName('');
        }
    },        [withSubSubject]);

    return (
        <Paper
            elevation={3}
            className={className}
        >
            <Typography variant='h4' color='primary' className={classes.title}>
                Налаштування тесту
            </Typography>
            <div className={classes.part}>
                <AdvancedTextField
                    value={subjectName}
                    callback={setSubjectName}
                    additionalCallback={() => {
                        if (errorFields.subjectName) {
                            closeSnackbar('create-test-error');
                        }
                    }}
                    list={subjects}
                    addCallback={() => fetchCreateSubject({ name: subjectName })}
                    label='Назва предмету'
                    variant='standard'
                    color='primary'
                    error={errorFields.subjectName}
                    helperText={errorFields.subjectName ? 'Поле не заповнено.' : null}
                />
            </div>
            <div className={classes.part}>
                <FormControlLabel
                    control={
                        <CheckBox
                            color='primary'
                            checked={withSubSubject}
                            onChange={event => toggleWithSubSubject(event.target.checked)}
                        />
                    }
                    label='Вибрати під-предмет'
                />
                <Collapse
                    in={withSubSubject}
                >
                    <AdvancedTextField
                        value={subSubjectName}
                        callback={setSubSubjectName}
                        additionalCallback={() => {
                            if (errorFields.subSubjectName) {
                                closeSnackbar('create-test-error');
                            }
                        }}
                        list={[]}
                        label='Під-предмет'
                        variant='standard'
                        color='primary'
                        error={errorFields.subSubjectName}
                        helperText={errorFields.subSubjectName ? 'Поле не заповнено.' : null}
                    />
                </Collapse>
            </div>
            <div className={classes.part}>
                <FormControl component='fieldset'>
                    <FormLabel
                        component='legend'
                        color='primary'
                    >
                        Оберіть тип тесту
                    </FormLabel>
                    <RadioGroup value={testType} onChange={handleChangeTestType}>
                        <FormControlLabel
                            value={ETestTypes.THEMES}
                            control={<Radio color='primary'/>}
                            label='Підготовка по темам'
                        />
                        <FormControlLabel
                            value={ETestTypes.EXAM}
                            control={<Radio color='primary' disabled={withSubSubject}/>}
                            label='ЗНО'
                        />
                    </RadioGroup>
                </FormControl>
                <Collapse in={testType === ETestTypes.THEMES}>
                    <AdvancedTextField
                        value={themeName}
                        callback={setThemeName}
                        additionalCallback={() => {
                            if (errorFields.subjectName) {
                                closeSnackbar('create-test-error');
                            }
                        }}
                        list={[]}
                        label='Назва теми'
                        color='primary'
                        variant='standard'
                        error={errorFields.themeName}
                        helperText={errorFields.themeName ? 'Поле не заповнено' : null}
                    />
                </Collapse>
            </div>
            <Collapse
                in={testType === ETestTypes.EXAM}
                className={classes.part}
            >
                <FormControl component='fieldset'>
                    <FormLabel
                        component='legend'
                        color='primary'
                    >
                        Оберіть тип тесту
                    </FormLabel>
                    <RadioGroup value={examType} onChange={handleChangeExamType}>
                        <FormControlLabel
                            value={EExamTypes.TRAINING}
                            control={<Radio color='primary'/>}
                            label='Тренувальні варінти ЗНО'
                        />
                        <FormControlLabel
                            value={EExamTypes.PREV_SESSIONS}
                            control={<Radio color='primary' disabled={withSubSubject}/>}
                            label='Попередні сессії ЗНО'
                        />
                    </RadioGroup>
                </FormControl>
                <AdvancedTextField
                    value={themeName}
                    callback={setThemeName}
                    list={[]}
                    label='Назва'
                    color='primary'
                    variant='standard'
                />
            </Collapse>
        </Paper>
    );
};

export default Component;
