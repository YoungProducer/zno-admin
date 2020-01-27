import {
    SetSearchUserResultCredentials,
    SetSearchUserResultAction,
    SearchUserResultActions,
} from "../../../types/store/actionsCreators/users/searchResult";
import { Handlers } from "../../../types/store/reducers";
import { SET_SEARCH_USER_RESULT, CLEAR_SEARCH_USER_RESULT } from "../../actionsTypes/users/searchResult";

export interface UserSearchResultInitialState {
    foundUsers: SetSearchUserResultCredentials[];
}

const INITIAL_STATE: UserSearchResultInitialState = {
    foundUsers: [],
};

const HANDLERS: Handlers = {
    [SET_SEARCH_USER_RESULT]: (state: UserSearchResultInitialState, action: SetSearchUserResultAction) => ({
        ...state,
        foundUsers: action.payload,
    }),
    [CLEAR_SEARCH_USER_RESULT]: (state: UserSearchResultInitialState) => ({
        ...INITIAL_STATE,
    }),
};

export default (state: UserSearchResultInitialState = INITIAL_STATE, action: SearchUserResultActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
