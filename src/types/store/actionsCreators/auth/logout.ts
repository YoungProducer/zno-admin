import {
    LoadingAction,
    FailureAction,
} from '../mainTypes';
import { SetLoggedInAction } from './signin';

export type LogoutActions = LoadingAction | FailureAction | SetLoggedInAction;
