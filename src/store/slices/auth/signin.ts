import {
    SUCCESS_SIGNIN,
    FAILURE_SIGNIN,
    LOADING_SIGNIN,
    SET_LOGGEDIN,
    SET_USER_DATA,
} from '../../actionsTypes/auth/signin';
import { Handlers } from '../../../types/store/reducers';
import { SigninActions, SuccessSignInAction, SetLoggedInAction, SetUserDataAction } from '../../../types/store/actionsCreators';
import { LoadingAction, FailureAction } from '../../../types/store/actionsCreators/mainTypes';

export interface SignInInitialState {
    loading: boolean;
    loggedIn: boolean;
    id: string;
    email: string;
    userName: string;
    role: string;
}

const INITIAL_STATE: SignInInitialState = {
    loading: false,
    loggedIn: false,
    id: null,
    email: null,
    userName: null,
    role: null,
};

const HANDLERS: Handlers = {
    [SUCCESS_SIGNIN]: (state: SignInInitialState, { payload: { id, email, userName, role } }: SuccessSignInAction) => ({
        ...state,
        id,
        email,
        userName,
        role,
    }),
    [FAILURE_SIGNIN]: (state: SignInInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return {
            ...state,
        };
    },
    [LOADING_SIGNIN]: (state: SignInInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
    [SET_LOGGEDIN]: (state: SignInInitialState, { payload: { loggedIn } }: SetLoggedInAction) => ({
        ...state,
        loggedIn,
        id: loggedIn ? state.id : null,
        userName: loggedIn ? state.userName : null,
        email: loggedIn ? state.email : null,
        role: loggedIn ? state.role : null,
    }),
    [SET_USER_DATA]: (state: SignInInitialState, action: SetUserDataAction) => ({
        ...state,
        ...action.payload,
    }),
};

export default (state: SignInInitialState = INITIAL_STATE, action: SigninActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
