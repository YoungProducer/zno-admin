/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Test suites for subjectConfig slice.
 */

/** Application's imports */
import subjectConfig, {
    SubjectConfig,
    setSubjectConfigErrorFields,
    setSubjectConfigFieldsMessages,
} from '../subjectConfig';

describe('SubjectConfig slice', () => {
    test('setSubjectConfigErrorFields with payload should correctly change error fields', () => {
        const initialState = {
            errorFields: {
                subjectName: false,
                subSubjectName: false,
                themeName: false,
            },
        } as SubjectConfig.State;

        const result = subjectConfig(initialState, setSubjectConfigErrorFields(['subjectName']));

        expect(result.errorFields.subjectName).toBeTruthy();
    });

    test('setSubjectConfigErrorFields without payload should set all props to false', () => {
        const initialState = {
            errorFields: {
                subjectName: true,
                subSubjectName: true,
                themeName: true,
            },
        } as SubjectConfig.State;

        const result = subjectConfig(initialState, setSubjectConfigErrorFields());

        expect(result.errorFields).toEqual({
            subjectName: false,
            subSubjectName: false,
            themeName: false,
        });
    });

    test('setSubjectConfigFieldsMessages with payload should correctly change fieldsMessages', () => {
        const MOCK_STATE = {
            fieldsMessages: {
                subjectName: '',
                subSubjectName: '',
                themeName: '',
            },
        } as SubjectConfig.State;

        const result = subjectConfig(MOCK_STATE, setSubjectConfigFieldsMessages({
            subjectName: 'foo',
        }));

        expect(result.fieldsMessages.subjectName).toBe('foo');
    });

    test('setSubjectConfigFieldsMessages without payload should set fieldsMessages to default', () => {
        const MOCK_STATE = {
            fieldsMessages: {
                subjectName: 'foo',
                subSubjectName: 'bar',
                themeName: '',
            },
        } as SubjectConfig.State;

        const result = subjectConfig(MOCK_STATE, setSubjectConfigFieldsMessages());

        expect(result.fieldsMessages.subjectName).toBe('');
        expect(result.fieldsMessages.subSubjectName).toBe('');
    });
});
