import {
    SET_SEARCH_USER_RESULT, CLEAR_SEARCH_USER_RESULT,
} from '../../actionsTypes/users/searchResult';
import { SetSearchUserResultCredentials, SetSearchUserResultAction } from '../../../types/store/actionsCreators/users/searchResult';

export const createSetSearchUserResultAction = (credentials: SetSearchUserResultCredentials[]): SetSearchUserResultAction => ({
    type: SET_SEARCH_USER_RESULT,
    payload: credentials,
});

export const createClearSearchUserResultAction = () => ({
    type: CLEAR_SEARCH_USER_RESULT,
});
