import { IAction } from "../mainTypes";

export interface SetSearchUserResultCredentials {
    id: string;
    email: string;
    userName: string;
}

export interface SetSearchUserResultAction extends IAction {
    payload: SetSearchUserResultCredentials[];
}

export interface ClearSearchUserResultAction extends IAction {}

export type SearchUserResultActions = SetSearchUserResultAction | ClearSearchUserResultAction;
