import { IAction, LoadingAction, FailureAction, Role } from '../mainTypes';

export interface FetchSignInCredentials {
    email: string;
    password: string;
}

export interface FetchSignInAction extends IAction {}

export interface SuccessSignInCredentials {
    id: string;
    email: string;
    userName: string;
    role: Role;
}

export interface SuccessSignInAction extends IAction {
    payload: SuccessSignInCredentials;
}

export interface SetLoggedInCredentials {
    loggedIn: boolean;
}

export interface SetLoggedInAction extends IAction {
    payload: SetLoggedInCredentials;
}

export interface SetUserDataCredentials {
    email?: string;
    userName?: string;
}

export interface SetUserDataAction extends IAction {
    payload: SetUserDataCredentials;
}

export { LoadingAction, LoadingCredentials } from '../mainTypes';
export type SigninActions = SuccessSignInAction | FailureAction | LoadingAction | SetLoggedInAction;
