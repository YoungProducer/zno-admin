// Created by: Oleksandr Bezrukov
// Creation date: 3 February 2020

// Slice related to saving all tasks untill its will be sended to server.

// External imports
import { createSlice } from '@reduxjs/toolkit';

// Application's imports
import { ETaskType } from 'components/CreateTest/TaskConfigurations/Component';
import { IImage } from './taskBuffer';

export interface ITask {
    // Unique id to correct editing and deleting
    id: number;
    // Define type of task: single answer, relation or text answers
    taskType: ETaskType;
    // Contain answer related to task type
    answer: number | any[];
    // Contain only name of file and preview string
    taskImage: IImage;
    // Contain only name of file and preview string
    explanationImage: IImage;
}

interface ITaskListInitialState {
    tasks: ITask[];
}

const initialState: ITaskListInitialState = {
    tasks: [],
};

interface IAddTaskPayload extends ITask {}

interface IAddTaskAction {
    payload: IAddTaskPayload;
}

interface IDeleteTaskAction {
    // Unique id to correct deleting
    payload: number;
}

const tasksListSlice = createSlice({
    initialState,
    name: 'TaskList',
    reducers: {
        addTaskAction: (
            state: ITaskListInitialState,
            { payload }: IAddTaskAction,
        ) => ({
            ...state,
            tasks: state.tasks.concat(payload),
        }),
        deleteTaskAction: (
            state: ITaskListInitialState,
            { payload }: IDeleteTaskAction,
        ) => ({
            ...state,
            tasks: state.tasks.filter(task => task.id !== payload),
        }),
    },
});

export const {
    addTaskAction,
    deleteTaskAction,
} = tasksListSlice.actions;

export default tasksListSlice.reducer;
