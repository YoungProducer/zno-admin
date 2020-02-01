import { Handlers } from "../../../types/store/reducers";
import { SUCCESS_UPDATE_USER_ROOTS, FAILURE_UPDATE_USER_ROOTS, LOADING_UPDATE_USER_ROOTS } from "../../actionsTypes/update/userRoots";
import { FailureAction, LoadingAction } from "../../../types/store/actionsCreators/mainTypes";
import { UpdateUserRootsActions } from "../../../types/store/actionsCreators/update/userRoot";

export interface UpdateUserRootsInitialState {
    loading: boolean;
    success: boolean;
}

const INITIAL_STATE: UpdateUserRootsInitialState = {
    loading: false,
    success: false,
};

const HANDLERS: Handlers = {
    [SUCCESS_UPDATE_USER_ROOTS]: (state: UpdateUserRootsInitialState) => ({
        ...state,
        success: true,
    }),
    [FAILURE_UPDATE_USER_ROOTS]: (state: UpdateUserRootsInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
    [LOADING_UPDATE_USER_ROOTS]: (state: UpdateUserRootsInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
};

export default (state: UpdateUserRootsInitialState = INITIAL_STATE, action: UpdateUserRootsActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
