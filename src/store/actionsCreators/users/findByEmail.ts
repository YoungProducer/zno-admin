import { Dispatch } from "redux";
import { AxiosResponse, AxiosError } from "axios";

import {
    FAILURE_FIND_USER_BY_EMAIL,
    LOADING_FIND_USER_BY_EMAIL,
} from "../../actionsTypes/users/findByEmail";
import {
    FailureCredentials,
    FailureAction,
    LoadingCredentials,
    LoadingAction,
} from "../../../types/store/actionsCreators/mainTypes";
import { FetchFindUserByEmailCredentials } from "../../../types/store/actionsCreators/users/findByEmail";
import { SearchUserResultActions, SetSearchUserResultCredentials } from "../../../types/store/actionsCreators/users/searchResult";
import { FindUserByEmailActions } from '../../../types/store/actionsCreators/users/findByEmail';
import { createSetSearchUserResultAction } from './searchResult';

import api from "../../middleware/api";

export const createFailureFindUserByEmailAction = ({ error }: FailureCredentials): FailureAction => ({
    type: FAILURE_FIND_USER_BY_EMAIL,
    payload: { error },
});

export const createLoadingFindUserByEmailAction = ({ loading }: LoadingCredentials): LoadingAction => ({
    type: LOADING_FIND_USER_BY_EMAIL,
    payload: { loading },
});

export const createFetchFindUserByEmail = (email: string) =>
    (dispatch: Dispatch<SearchUserResultActions | FindUserByEmailActions>) => {
        dispatch(createLoadingFindUserByEmailAction({ loading: true }));

        api.findUserByEmail({ email })
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                dispatch(createLoadingFindUserByEmailAction({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => response.data)
            .then((users: SetSearchUserResultCredentials[]) => dispatch(createSetSearchUserResultAction(users)))
            .catch((error: AxiosError) => dispatch(createFailureFindUserByEmailAction({ error })));
    };
