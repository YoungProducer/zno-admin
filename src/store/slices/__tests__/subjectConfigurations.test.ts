/**
 * Create by: Oleksandr Bezrukov
 * Creation date: 17 February
 *
 * Create tests suites SubjectConfigurations slice.
 */

// External imports

// Application's imports
import subjectConfigurations, {
    checkEmptyFieldsAction,
    setErrorFieldsAction,
    ISubjectConfigurationsInitialState,
} from '../createTest/subjectConfigurations';

describe('SubjectConfigurations slice', () => {
    test('checkEmptyFieldsAction without subsubject', () => {
        // Define initial state
        const initialState = {
            subjectName: 'foo',
            subSubjectName: '',
            themeName: 'bar',
            withSubSubject: false,
        };

        // Define expected state
        const expected = {
            subjectName: false,
            subSubjectName: false,
            themeName: false,
        };

        // Get result of dispatched action
        const result = subjectConfigurations(initialState as ISubjectConfigurationsInitialState, checkEmptyFieldsAction());

        // Check is result has property 'errorFields'
        expect(result).toHaveProperty('errorFields');

        // Check is property 'errorFields' of result equals to expected value
        expect(result.errorFields).toEqual(expected);
    });

    test('checkEmptyFieldsAction without subsubject and with all empty fields', () => {
        // Define initial state
        const initialState = {
            subjectName: '',
            subSubjectName: '',
            themeName: '',
            withSubSubject: false,
        };

        // Define expected state
        const expected = {
            subjectName: true,
            subSubjectName: false,
            themeName: true,
        };

        // Get result of dispatched action
        const result = subjectConfigurations(initialState as ISubjectConfigurationsInitialState, checkEmptyFieldsAction());

        // Check is result has property 'errorFields'
        expect(result).toHaveProperty('errorFields');

        // Check is property 'errorFields' of result equals to expected value
        expect(result.errorFields).toEqual(expected);
    });

    test('setErrorFieldsAction without subsubject', () => {
        // Define initial state
        const initialState = {
            subjectName: '',
            subSubjectName: '',
            themeName: '',
            withSubSubject: false,
        };

        // Define expected state
        const expected = {
            subjectName: true,
            subSubjectName: false,
            themeName: true,
        };

        // Get result of dispatched action
        const result = subjectConfigurations(initialState as ISubjectConfigurationsInitialState, setErrorFieldsAction({
            subjectName: true,
            subSubjectName: true,
            themeName: true,
        }));

        // Check is result has property 'errorFields'
        expect(result).toHaveProperty('errorFields');

        // Check is property 'errorFields' of result equals to expected value
        expect(result.errorFields).toEqual(expected);
    });

    test('setErrorFieldsAction with subsubject', () => {
        // Define initial state
        const initialState = {
            subjectName: '',
            subSubjectName: '',
            themeName: '',
            withSubSubject: true,
        };

        // Define expected state
        const expected = {
            subjectName: false,
            subSubjectName: false,
            themeName: false,
        };

        // Get result of dispatched action
        const result = subjectConfigurations(initialState as ISubjectConfigurationsInitialState, setErrorFieldsAction({
            subjectName: false,
            subSubjectName: false,
            themeName: false,
        }));

        // Check is result has property 'errorFields'
        expect(result).toHaveProperty('errorFields');

        // Check is property 'errorFields' of result equals to expected value
        expect(result.errorFields).toEqual(expected);
    });
});
