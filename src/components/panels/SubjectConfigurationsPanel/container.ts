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
    createSubjectAction,
    fetchSubjectsDataAction,
} from 'store/actionsCreators/subject';
import {
    toggleWithSubSubjectAction,
    setSubjectNameAction,
    setSubSubjectNameAction,
    setTestTypeAction,
    setExamTypeAction,
    setThemeNameAction,
    SubjectConfigSlice,
    TExamType,
    TTestType,
} from 'store/slices/subjectConfig';
import {
    selectSubjectConfigErrorFields,
    selectWithSubSubject,
    selectMainFields,
} from 'store/selectors/subjectConfig';
import {
    selectSubjectsNames,
    selectSubSubjectsNames,
} from 'store/selectors/subject';
import { closeSnackbarAction } from 'store/slices/notifier';
import { RootState } from 'store/slices';
import { Subject } from 'api/types';

export interface IMainFields {
    subjectName: string;
    subSubjectName: string;
    testType: TTestType;
    examType: TExamType;
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
    subjectsNames: string[];
    subSubjectsNames: string[];
    mainFields: IMainFields;
    errorFields: SubjectConfigSlice.ErrorFields;
    withSubSubject: boolean;
}

/**
 * Props(actions) or async actions which component can dispatch.
 */
interface IDispatchProps {
    fetchCreateSubject: (payload: Subject.CreatePayload) => void;
    fetchSubjectsData: () => void;
    toggleWithSubSubject: (payload: boolean) => void;
    setSubjectName: (name: string) => void;
    setSubSubjectName: (name: string) => void;
    setTestType: (testType: TTestType) => void;
    setExamType: (examType: TExamType) => void;
    setThemeName: (name: string) => void;
    closeSnackbar: (payload?: string | number) => void;
}

/**
 * Declare main type which describe all props pushed to the component.
 */
export type TSubjectConfigurationsPanelProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

/**
 * Define function mapStateToProps.
 * This function select some variables from the redux store to the component.
 */
const mapStateToProps = (state: RootState): IStateProps => ({
    subjectsNames: selectSubjectsNames(state),
    subSubjectsNames: selectSubSubjectsNames(state),
    mainFields: selectMainFields(state),
    errorFields: selectSubjectConfigErrorFields(state),
    withSubSubject: selectWithSubSubject(state),
});

/**
 * Define function mapDispatchToProps.
 * This funciton create functions which dispatch some actions to the store.
 */
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    fetchCreateSubject: (payload: Subject.CreatePayload) =>
        dispatch(createSubjectAction(payload)),

    fetchSubjectsData: () =>
        dispatch(fetchSubjectsDataAction()),

    toggleWithSubSubject: (payload: boolean) =>
        dispatch(toggleWithSubSubjectAction(payload)),

    setSubjectName: (name: string) =>
        dispatch(setSubjectNameAction(name)),

    setSubSubjectName: (name: string) =>
        dispatch(setSubSubjectNameAction(name)),

    setTestType: (testType: TTestType) =>
        dispatch(setTestTypeAction(testType)),

    setExamType: (examType: TExamType) =>
        dispatch(setExamTypeAction(examType)),

    setThemeName: (name: string) =>
        dispatch(setThemeNameAction(name)),

    closeSnackbar: (payload?: string | number) =>
        dispatch(closeSnackbarAction(payload)),
});

/**
 * Export function which connect actions and/or variables from the redux store to the component.
 */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
);
