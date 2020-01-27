import { IAction, LoadingAction, FailureAction } from '../mainTypes';

export interface FetchSignUpCredentials {
    email: string;
    password: string;
    userName?: string;
}

export interface FetchSignUpAction { }

export interface SuccessSignUpCredentials {
    email: string;
}

export interface SuccessSignUpAction extends IAction {
    payload: SuccessSignUpCredentials;
}

export { LoadingAction, LoadingCredentials } from '../mainTypes';
export type SignUpActions = SuccessSignUpAction | FailureAction | LoadingAction;
