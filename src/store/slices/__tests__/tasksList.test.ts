/**
 * Created by: Oleksnar Bezrukov
 * Creation date: 16 February 2020
 *
 * Create test suites for 'CreateTest' slice.
 */

// Application's imports
import {
    activateEditionModeAction,
    deactivateEditionModeAction,
    addTaskAction,
    deleteTaskAction,
    setErrorTasksAction,
    ETaskType,
} from '../createTest';
import tasksList, { ITaskListInitialState } from '../createTest/tasksList';

describe('TasksList slice', () => {
    test('activateEditionModeAction', () => {
        const initialState: ITaskListInitialState = {
            tasks: [],
            editionMode: false,
            id: 0,
        };

        const result = tasksList(initialState, activateEditionModeAction());

        expect(result.editionMode).toBe(true);
    });

    test('deactivateEditionModeAction', () => {
        const initialState: ITaskListInitialState = {
            tasks: [],
            editionMode: true,
            id: 0,
        };

        const result = tasksList(initialState, deactivateEditionModeAction());

        expect(result.editionMode).toBe(false);
    });

    test('addTaskAction', () => {
        // Define initial state
        const initialState: ITaskListInitialState = {
            tasks: [],
            editionMode: false,
            id: 0,
        };

        // Define expected state
        const expectedState: ITaskListInitialState = {
            tasks: [{
                answer: 0,
                answersAmount: 1,
                id: 0,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
            }],
            editionMode: false,
            id: 1,
        };

        // Get result of action
        const result = tasksList(initialState, addTaskAction({
            answer: 0,
            answersAmount: 1,
            taskType: ETaskType.ONE_RIGHT,
            taskImage: null,
            explanationImage: null,
        }));

        // Check is length of array is 1
        expect(result.tasks).toHaveLength(1);

        // Check is id of first equals to 0
        expect(result.tasks[0].id).toBe(0);

        // Check is result equals to expected state
        expect(result).toEqual(expectedState);
    });

    test('deleteTaskAction', () => {
        // Define initial state
        const initialState: ITaskListInitialState = {
            tasks: [{
                answer: 0,
                answersAmount: 1,
                id: 0,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
            }],
            editionMode: false,
            id: 1,
        };

        // Define expected state
        const expectedState: ITaskListInitialState = {
            tasks: [],
            editionMode: false,
            id: 1,
        };

        // Get result of dispatched aciton
        const result = tasksList(initialState, deleteTaskAction(0));

        // Check is array now empty
        expect(result.tasks).toHaveLength(0);

        // Check is result equals to expected state
        expect(result).toEqual(expectedState);
    });

    test('check id of last task after few addition and deletion', () => {
        // Define initial state
        const initialState: ITaskListInitialState = {
            tasks: [],
            editionMode: false,
            id: 0,
        };

        // Get result of dispatched action
        const result = tasksList(initialState, addTaskAction({
            answer: 0,
            answersAmount: 1,
            taskType: ETaskType.ONE_RIGHT,
            taskImage: null,
            explanationImage: null,
        }));

        // Check is id of first task of the first version of the store equals to 0
        expect(result.tasks[0].id).toEqual(0);

        const result1 = tasksList(result, deleteTaskAction(0));

        // Check is tasks array is empty
        expect(result1.tasks).toHaveLength(0);

        const result2 = tasksList(result1, addTaskAction({
            answer: 0,
            answersAmount: 1,
            taskType: ETaskType.ONE_RIGHT,
            taskImage: null,
            explanationImage: null,
        }));

        // Check is tasks array length of result2 equals to 1
        expect(result2.tasks).toHaveLength(1);

        // Check is id of first task of latest store equals to 1
        expect(result2.tasks[0].id).toBe(1);
    });

    test('setErrorTasksAction', () => {
        // Define initial state
        const initialState: ITaskListInitialState = {
            tasks: [{
                answer: 0,
                answersAmount: 1,
                id: 0,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
            }, {
                answer: 0,
                answersAmount: 1,
                id: 1,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
            }],
            editionMode: false,
            id: 2,
        };

        // Define expected state
        const expectedState: ITaskListInitialState = {
            tasks: [{
                answer: 0,
                answersAmount: 1,
                id: 0,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
                error: true,
            }, {
                answer: 0,
                answersAmount: 1,
                id: 1,
                taskType: ETaskType.ONE_RIGHT,
                taskImage: null,
                explanationImage: null,
            }],
            editionMode: false,
            id: 2,
        };

        // Get result of dispatched action
        const result = tasksList(initialState, setErrorTasksAction([0]));

        // Check is array lengt equals 2
        expect(result.tasks).toHaveLength(2);

        // Check is result equals expected state
        expect(result).toEqual(expectedState);
    });
});
