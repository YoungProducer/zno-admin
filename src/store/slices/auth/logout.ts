import { Handlers } from "../../../types/store/reducers";
import { LOADING_LOGOUT, FAILURE_LOGOUT } from "../../actionsTypes/auth/logout";
import { LoadingAction } from "../../../types/store/actionsCreators";
import { FailureAction } from "../../../types/store/actionsCreators/mainTypes";
import { LogoutActions } from "../../../types/store/actionsCreators/auth/logout";

export interface LogoutInitialState {
    loading: boolean;
}

const INITIAL_STATE: LogoutInitialState = {
    loading: false,
};

const HANDLERS: Handlers = {
    [LOADING_LOGOUT]: (state: LogoutInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
    [FAILURE_LOGOUT]: (state: LogoutInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
};

export default (state: LogoutInitialState = INITIAL_STATE, action: LogoutActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
