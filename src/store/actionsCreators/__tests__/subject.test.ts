/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * @jest-environment jsdom
 */

/** External imports */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

/** Application's imports */
import api from 'api';
import history from 'routes/history';
import {
    fetchSubjectsDataAction,
    createSubjectAction,
} from '../subject';
import { RootState } from 'store/slices';

describe('Subject async actions', () => {
    const MOCK_STATE = {
        subject: {
            loading: false,
        },
    } as RootState;

    const middleware = [thunk.withExtraArgument({
        api,
        history,
    })];

    const store = configureMockStore(middleware)(MOCK_STATE);

    const axiosMock = new MockAdapter(api.instance);

    afterEach(() => {
        store.clearActions();
        axiosMock.reset();
    });

    test('fetchSubjectsDataAction success', () => {
        axiosMock
            .onGet('/api/subject')
            .reply(200, [{
                id: 'foo',
                name: 'bar',
            }]);

        axiosMock
            .onGet('/api/subject?subSubject=true')
            .reply(200, [{
                id: '123',
                name: '456',
            }]);

        const expectedAcitions = [{
            type: 'Subject/toggleSubjectLoadingAction',
            payload: true,
        }, {
            type: 'Subject/toggleSubjectLoadingAction',
            payload: false,
        }, {
            type: 'Subject/setSubjectsAction',
            payload: [{
                id: 'foo',
                name: 'bar',
            }],
        }, {
            type: 'Subject/setSubSubjectsAction',
            payload: [{
                id: '123',
                name: '456',
            }],
        }];

        return store.dispatch(fetchSubjectsDataAction() as any)
            .then(() => {
                /** Assert array of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedAcitions);
            });
    });

    test('createSubjectAction success(subject)', () => {
        axiosMock
            .onPost('/api/subject')
            .reply(200, {
                id: 'foo',
                name: 'bar',
                subSubject: false,
            });

        const expectedActions = [{
            type: 'Subject/toggleSubjectLoadingAction',
            payload: true,
        }, {
            type: 'Subject/toggleSubjectLoadingAction',
            payload: false,
        }, {
            type: 'Subject/addSubjectAction',
            payload: {
                id: 'foo',
                name: 'bar',
                subSubject: false,
            },
        }];

        return store.dispatch(createSubjectAction({ name: 'foo' }) as any)
            .then(() => {
                /** Assert array of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    test('createSubjectAction success(subSubject)', () => {
        axiosMock
            .onPost('/api/subject')
            .reply(200, {
                id: 'foo',
                name: 'bar',
                subSubject: true,
            });

        const expectedActions = [{
            type: 'Subject/toggleSubjectLoadingAction',
            payload: true,
        }, {
            type: 'Subject/toggleSubjectLoadingAction',
            payload: false,
        }, {
            type: 'Subject/addSubSubjectAction',
            payload: {
                id: 'foo',
                name: 'bar',
                subSubject: true,
            },
        }];

        return store.dispatch(createSubjectAction({ name: 'foo' }) as any)
            .then(() => {
                /** Assert array of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
