import {
    Handlers,
} from '../../../types/store/reducers';
import { LOADING_REFRESH, FAILURE_REFRESH } from '../../actionsTypes/auth/refresh';
import { RefreshActions } from '../../../types/store/actionsCreators/auth/refresh';
import { LoadingAction } from '../../../types/store/actionsCreators';
import { FailureAction } from '../../../types/store/actionsCreators/mainTypes';

export interface RefreshInitialState {
    loading: boolean;
}

const INITIAL_STATE: RefreshInitialState = {
    loading: false,
};

const HANDLERS: Handlers = {
    [FAILURE_REFRESH]: (state: RefreshInitialState, { payload: { error } }: FailureAction) => {
        console.log(error.message);
        return { ...state };
    },
    [LOADING_REFRESH]: (state: RefreshInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
};

export default (state: RefreshInitialState = INITIAL_STATE, action: RefreshActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
