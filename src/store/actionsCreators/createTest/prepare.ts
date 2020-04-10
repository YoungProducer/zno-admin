/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 April 2020
 *
 * Functions which prepare data for request.
 */

/** Application's imports */
import { MainFields } from './hasErrors';
import { RootState } from 'store/slices';
import { TaskType, Image } from 'store/slices/task';
import { TasksListSlice } from 'store/slices/tasksList';

export interface PreparedFields {
    subjectName: string;
    subSubjectName: string;
    theme: string;
    training: string;
    session: string;
}

export type PrepareSubjectConfig = (mainFields: MainFields, state: RootState) =>
    Partial<PreparedFields>;

export interface PreparedAnswer {
    answer: string[];
    type: TaskType;
}

export type PrepareAnswers = (tasksList: Partial<TasksListSlice.ExtendedTask>[]) =>
    PreparedAnswer[];

export type PrepareImagesReturn = {
    tasks: {
        [attr: string]: File;
    };
    explanations: {
        [attr: string]: File;
    };
};

export type PrepareImages = (
    tasksImages: Image[],
    explanationsImages: Image[],
) => PrepareImagesReturn;

export const prepareSubjectConfig: PrepareSubjectConfig = (mainFields, state) => {
    const {
        subjectName,
        subSubjectName,
        themeName,
        testType,
        examType,
        withSubSubject,
    } = mainFields;

    return Object
        .entries({
            subjectName,
            subSubjectName: withSubSubject ? subSubjectName : null,
            theme: testType === 'THEME' ? themeName : null,
            training: testType === 'EXAM' && examType === 'TRAINING' ? themeName : null,
            session: testType === 'EXAM' && examType === 'SESSION' ? themeName : null,
        })
        .reduce((acc, curr) => {
            if (curr[1] === null) return acc;

            return {
                ...acc,
                [curr[0]]: curr[1],
            };
        }, {});
};

export const prepareAnswers: PrepareAnswers = (tasksList) =>
    tasksList.map(task => ({
        answer: task.answer,
        type: task.type,
    }));

export const prepareImages: PrepareImages = (
    tasksImages,
    explanationsImages,
) => ({
    tasks: tasksImages.reduce((acc, curr, index) => ({
        ...acc,
        [`task${index}`]: curr,
    }), {}),
    explanations: explanationsImages.reduce((acc, curr, index) => ({
        ...acc,
        [`explanation${index}`]: curr,
    }), {}),
});
