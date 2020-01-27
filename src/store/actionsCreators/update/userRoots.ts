import { Dispatch } from "redux";
import { AxiosResponse, AxiosError } from "axios";

import { FailureCredentials, FailureAction, LoadingCredentials, LoadingAction } from "../../../types/store/actionsCreators/mainTypes";
import { FetchUpdateUserRootsCredentials, SuccessUpdateUserRootsAction, UpdateUserRootsActions } from "../../../types/store/actionsCreators/update/userRoot";
import { SUCCESS_UPDATE_USER_ROOTS, FAILURE_UPDATE_USER_ROOTS, LOADING_UPDATE_USER_ROOTS } from "../../actionsTypes/update/userRoots";
import api from "../../middleware/api";

export const createSuccessUpdateUserRoots = (): SuccessUpdateUserRootsAction => ({
    type: SUCCESS_UPDATE_USER_ROOTS,
});

export const createFailureUpdateUserRoots = ({ error }: FailureCredentials): FailureAction => ({
    type: FAILURE_UPDATE_USER_ROOTS,
    payload: { error },
});

export const craeteLoadingUpdateUserRoots = ({ loading }: LoadingCredentials): LoadingAction => ({
    type: LOADING_UPDATE_USER_ROOTS,
    payload: { loading },
});

export const createFetchUpdateUserRoots = (credentials: FetchUpdateUserRootsCredentials) =>
    (dispatch: Dispatch<UpdateUserRootsActions>) => {
        dispatch(craeteLoadingUpdateUserRoots({ loading: true }));

        api.updateUserRoots(credentials)
            .then((response: AxiosResponse) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                dispatch(craeteLoadingUpdateUserRoots({ loading: false }));

                return response;
            })
            .then((response: AxiosResponse) => {
                if (response.data === 'Success') {
                    dispatch(createSuccessUpdateUserRoots());
                }
            })
            .catch((error: AxiosError) => dispatch(createFailureUpdateUserRoots({ error })));
    };
