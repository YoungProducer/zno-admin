// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Configure store and apply middlewares

// External impors
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { History } from 'history';

// Application's imports
import rootReducer from './slices';
import api from 'api';
import { IApi } from 'api/types';
import history from 'routes/history';
import znoMiddlewares from 'store/middlewares';

export interface ThunkExtraArgument {
    history: History<{}>;
    api: IApi;
}

const createStore = () => {
    /** Extract env variable */
    const production = process.env.NODE_ENV === 'production';
    const development = process.env.NODE_ENV === 'development';

    /** Define middlewares */
    const defaultMiddleware = getDefaultMiddleware({
        thunk: {
            extraArgument: {
                history,
                api,
            },
        },
        serializableCheck: ({
            ignoredActions: [
                /**
                 * This actions work with File's.
                 * To prevent error about non-serializable values need to ignore its.
                 */
                'Task/setTaskImageAction',
                'Task/setExplanationImageAction',
                'Task/clearTaskAction',
                'Task/setImageAction',
                'Task/deleteImageAction',
                'TasksList/addTaskAction',
                'TasksList/deleteTaskByIdAction',
                'TasksList/updateTaskAction',
                'TasksList/setOpenTasksListAction',
                'CreateTest/setCreateTestLoadingAction',
                'CreateTest/setTasksListErrorsAction',
                'CreateTest/setSubjectConfigErrorsAction',
                /**
                 * This actions in some cases can work with react component.
                 * To prevent errors its must be added to ignoredActions.
                 */
                'Notifier/closeSnackbarAction',
                'Notifier/enqueueSnackbarAction',
                'Notifier/removeSnackbarAction',
                'SubjectConfig/setSubjectNameAction',
                'SubjectConfig/setSubSubjectNameAction',
                'SubjectConfig/setThemeNameAction',
            ],
            ignoredPaths: [
                'tasksList.tasks',
                'task.image',
                'task.explanationImage',
            ],
        }),
        immutableCheck: ({
            ignore: ['task', 'tasksList'],
        }),
    });

    const logger = !production
        ? require('redux-logger').createLogger({
            collapsed: true,
            diff: true,
        })
        : undefined;

    const middleware = production
        ? [...defaultMiddleware, ...znoMiddlewares]
        : [...defaultMiddleware, logger, ...znoMiddlewares];

    return configureStore({
        middleware,
        reducer: rootReducer,
    });
};

const store = createStore();

export type Store = typeof store;

export type AppDispatch = typeof store.dispatch;

export default store;
