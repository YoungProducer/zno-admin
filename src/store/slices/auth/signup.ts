// Import Action types
import {
    SUCCESS_SIGNUP,
    FAILURE_SIGNUP,
    LOADING_SIGNUP,
} from '../../actionsTypes/auth/signup';

// Import interfaces
import {
    Handlers,
} from '../../../types/store/reducers';

import {
    FailureAction,
    LoadingAction,
} from '../../../types/store/actionsCreators/mainTypes';

import {
    SuccessSignUpAction,
    SignUpActions,
} from '../../../types/store/actionsCreators/auth/signup';

export interface SignUpInitialState {
    loading: boolean;
    email: string;
}

const INITIAL_STATE: SignUpInitialState = {
    loading: false,
    email: null,
};

const HANDLERS: Handlers = {
    [SUCCESS_SIGNUP]: (state: SignUpInitialState, action: SuccessSignUpAction) => ({
        ...state,
        email: action.payload.email,
    }),
    [FAILURE_SIGNUP]: (state: SignUpInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
    [LOADING_SIGNUP]: (state: SignUpInitialState, action: LoadingAction) => ({
        ...state,
        loading: action.payload.loading,
    }),
};

export default (state: SignUpInitialState = INITIAL_STATE, action: SignUpActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
