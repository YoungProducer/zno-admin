import { IAction, LoadingAction, FailureAction } from '../mainTypes';

export interface FetchUserCredentials {
    email?: string;
    userName?: string;
    password?: string;
    previousPassword?: string;
}

export type UpdateUserActions = LoadingAction | FailureAction;
