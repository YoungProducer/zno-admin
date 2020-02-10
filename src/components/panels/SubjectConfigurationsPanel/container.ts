// Created by: Oleksandr Bezrukov
// Creation data: 9 February 2020

/**
 * Desribe main types and interfaces related to SubjectConfigurationsPanel component.
 * Create function which connect actions and/or variables from the store to the component.
 */

// External imports
import { connect } from 'react-redux';

// Application's imports
import {
    fetchCreateSubject,
    fetchGetSubjectsNames,
} from 'store/actionsCreators/createTest';
import {
    setSubjectNameAction,
    setSubSubjectNameAction,
    setTestTypeAction,
    setExamTypeAction,
    setThemeNameAction,
} from 'store/slices/createTest';
import {
    selectSubjects,
    selectSubjectConfigurationsMainFields,
} from 'store/selectors/createTest';
import { RootState } from 'store/slices';
import { ICreateSubjectCredentials } from 'api/types';
import { ETestTypes, EExamTypes } from './Component';

export interface IMainFields {
    subjectName: string;
    subSubjectName: string;
    testType: ETestTypes;
    examType: EExamTypes;
    themeName: string;
}

/**
 * Props which component get from the parent.
 */
interface IOwnProps {
    className: string;
}

/**
 * Props which component get from the redux-store.
 */
interface IStateProps {
    subjects: string[];
    mainFields: IMainFields;
}

/**
 * Props(actions) or async actions which component can dispatch.
 */
interface IDispatchProps {
    fetchCreateSubject: (credentials: ICreateSubjectCredentials) => void;
    fetchGetSubjectsNames: () => void;
    setSubjectName: (name: string) => void;
    setSubSubjectName: (name: string) => void;
    setTestType: (testType: ETestTypes) => void;
    setExamType: (examType: EExamTypes) => void;
    setThemeName: (name: string) => void;
}

/**
 * Declare main type which describe all props pushed to the component.
 */
export type TSubjectConfigurationsPanelProps = IOwnProps & IStateProps & IDispatchProps;

/**
 * Define function mapStateToProps.
 * This function select some variables from the redux store to the component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    subjects: selectSubjects(state),
    mainFields: selectSubjectConfigurationsMainFields(state),
});

/**
 * Define function mapDispatchToProps.
 * This funciton create functions which dispatch some actions to the store.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchCreateSubject: (credentials: ICreateSubjectCredentials) =>
        dispatch(fetchCreateSubject(credentials)),

    fetchGetSubjectsNames: () =>
        dispatch(fetchGetSubjectsNames()),

    setSubjectName: (name: string) =>
        dispatch(setSubjectNameAction(name)),

    setSubSubjectName: (name: string) =>
        dispatch(setSubSubjectNameAction(name)),

    setTestType: (testType: ETestTypes) =>
        dispatch(setTestTypeAction(testType)),

    setExamType: (examType: EExamTypes) =>
        dispatch(setExamTypeAction(examType)),

    setThemeName: (name: string) =>
        dispatch(setThemeNameAction(name)),
});

/**
 * Export function which connect actions and/or variables from the redux store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
