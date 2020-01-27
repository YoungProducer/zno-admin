import { Handlers } from "../../../types/store/reducers";
import { FAILURE_FIND_USER_BY_EMAIL, LOADING_FIND_USER_BY_EMAIL } from "../../actionsTypes/users/findByEmail";
import { FailureAction, LoadingAction } from "../../../types/store/actionsCreators/mainTypes";
import { FindUserByEmailActions } from "../../../types/store/actionsCreators/users/findByEmail";

export interface FindUserByEmailIntialState {
    loading: boolean;
}

const INITIAL_STATE: FindUserByEmailIntialState = {
    loading: false,
};

const HANDLERS: Handlers = {
    [FAILURE_FIND_USER_BY_EMAIL]: (state: FindUserByEmailIntialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
    [LOADING_FIND_USER_BY_EMAIL]: (state: FindUserByEmailIntialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
};

export default (state: FindUserByEmailIntialState = INITIAL_STATE, action: FindUserByEmailActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
