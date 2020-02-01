import {
    Handlers,
} from '../../../types/store/reducers/index';
import { SUCCESS_ME, FAILURE_ME, LOADING_ME } from '../../actionsTypes/auth/me';
import { LoadingAction } from '../../../types/store/actionsCreators';
import { MeActions } from '../../../types/store/actionsCreators/auth/me';
import { FailureAction } from '../../../types/store/actionsCreators/mainTypes';

export interface MeInitialState {
    loading: boolean;
}

const INITIAL_STATE: MeInitialState = {
    loading: false,
};

const HANDLERS: Handlers = {
    [FAILURE_ME]: (state: MeInitialState, { payload: { error } }: FailureAction) => {
        console.log(error);
        return { ...state };
    },
    [LOADING_ME]: (state: MeInitialState, { payload: { loading } }: LoadingAction) => ({
        ...state,
        loading,
    }),
};

export default (state: MeInitialState = INITIAL_STATE, action: MeActions) =>
    HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
