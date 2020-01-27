import { LoadingAction, FailureAction } from "../mainTypes";

export interface FetchFindUserByEmailCredentials {
    email: string;
}

export type FindUserByEmailActions = LoadingAction | FailureAction;
