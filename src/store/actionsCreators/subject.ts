/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Async action creators which handle main opertaions
 * related to subject controller of zno-train api.
 * Kinda read, create, update, etc...
 */

/** External imports */
import axios, { AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import { Subject } from 'api/types';
import { RootState } from 'store/slices';
import { ThunkExtraArgument } from 'store';
import {
    toggleSubjectLoadingAction,
    setSubjectsAction,
    setSubSubjectsAction,
    addSubjectAction,
    addSubSubjectAction,
} from 'store/slices/subject';

export const fetchSubjectsData = () =>
    async (dispatch: Dispatch<any>, _: () => RootState, extra: ThunkExtraArgument) => {
        dispatch(toggleSubjectLoadingAction(true));

        const { api } = extra;

        const combinedFetch = async () => await axios.all([
            await api.subjectsData(),
            await api.subSubjectsData()],
        );

        return combinedFetch()
            .then(axios.spread((subjects, subSubjects) => {
                dispatch(toggleSubjectLoadingAction(false));

                return [subjects.data, subSubjects.data];
            }))
            .then(([subjects, subSubjects]) => {
                dispatch(setSubjectsAction(subjects));
                dispatch(setSubSubjectsAction(subSubjects));
            })
            .catch((error: AxiosError) => { console.error(error); });
    };

export const createSubject = (payload: Subject.CreatePayload) =>
    async (
        dispatch: Dispatch<any>,
        _: () => RootState,
        extra: ThunkExtraArgument,
    ) => {
        dispatch(toggleSubjectLoadingAction(true));

        const { api } = extra;

        return api.createSubject(payload)
            .then(response => {
                dispatch(toggleSubjectLoadingAction(false));

                return response.data;
            })
            .then(subject => {
                if (subject.subSubject) {
                    dispatch(addSubSubjectAction(subject));
                } else {
                    dispatch(addSubjectAction(subject));
                }
            })
            .catch((error: AxiosError) => console.error(error));
    };
