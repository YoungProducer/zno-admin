import {
    LoadingAction,
    FailureAction,
} from '../mainTypes';

import {
    SuccessSignInAction, SetLoggedInAction,
} from './signin';

export type RefreshActions = LoadingAction | FailureAction | SuccessSignInAction | SetLoggedInAction;
