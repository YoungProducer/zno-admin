import { Handlers } from "../../../types/store/reducers";
import { LOADING_USER, FAILURE_USER } from "../../actionsTypes/update/user";
import { LoadingAction } from "../../../types/store/actionsCreators";
import { FailureAction } from "../../../types/store/actionsCreators/mainTypes";
import { UpdateUserActions } from "../../../types/store/actionsCreators/update/user";

export interface UpdateUserInitialState {
    loading: boolean;
}

const INITIAL_STATE: UpdateUserInitialState = {
    loading: false,
};

const HANDLERS: Handlers = {
    [FAILURE_USER]: (state: UpdateUserInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
    [LOADING_USER]: (state: UpdateUserInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
};

export default (state: UpdateUserInitialState = INITIAL_STATE, action: UpdateUserActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
