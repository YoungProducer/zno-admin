/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 April 2020
 *
 * Functions which check is all data is filled correctly.
 */

/** Application's imports */
import { SubjectConfigSlice } from 'store/slices/subjectConfig';
import { TasksListSlice } from 'store/slices/tasksList';
import { CreateTestSlice } from 'store/slices/createTest';
import { WithError, ErrorMessages } from 'store/slices/types';

export type MainFields = SubjectConfigSlice.MainFields & SubjectConfigSlice.AdditionalFields;

export type HasSubjectConfigErrors = (mainFields: MainFields) =>
    WithError<CreateTestSlice.SetSubjectConfigErrorsPayload>;

export type HasTasksListErrors = (tasksList: Partial<TasksListSlice.ExtendedTask>[]) =>
    WithError<Partial<CreateTestSlice.TasksListErrors>>;

export const hasSubjectConfigErrors: HasSubjectConfigErrors = (mainFields) => {
    const {
        subjectName,
        subSubjectName,
        themeName,
        withSubSubject,
    } = mainFields;

    const subjectConfigErrorFields: string[] = [
        subjectName === '' && 'subjectName',
        withSubSubject && subSubjectName === '' && 'subSubjectName',
        themeName === '' && 'themeName',
    ].filter(Boolean);

    const subjectConfigErrorMessages: ErrorMessages<SubjectConfigSlice.MainFields> = {
        subjectName: subjectName === ''
            ? `Відсутнє ім'я предмету`
            : undefined,
        subSubjectName: withSubSubject && subSubjectName === ''
            ? `Відсутнє ім'я під предмету`
            : undefined,
        themeName: themeName === ''
            ? `Відсутнє ім'я теми чи екзамену`
            : undefined,
    };

    if (subjectConfigErrorFields.length !== 0) {
        return {
            fields: subjectConfigErrorFields,
            messages: subjectConfigErrorMessages,
            hasError: true,
        };
    }

    return {
        hasError: false,
    };
};

export const hasTasksListErrors: HasTasksListErrors = (tasksList) => {
    if (tasksList.length === 0) return { hasError: true };

    const invalidTasks = tasksList.reduce((acc, curr, index) => {
        if (!curr.images.task
            || curr.answer.some(el => el === '')
        ) {
            return acc.concat(index);
        }

        return acc;
    }, []);

    if (invalidTasks.length !== 0) {
        return {
            invalidTasks,
            hasError: true,
        };
    }

    return {
        hasError: false,
    };
};
