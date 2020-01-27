import { Role, FailureAction, LoadingAction, IAction } from "../mainTypes";

export interface FetchUpdateUserRootsCredentials {
    userId: string;
    newRole: string;
}

export interface SuccessUpdateUserRootsAction extends IAction {}

export type UpdateUserRootsActions = SuccessUpdateUserRootsAction | FailureAction | LoadingAction;
