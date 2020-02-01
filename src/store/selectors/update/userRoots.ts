import { UpdateUserRootsInitialState } from "../../slices/update/userRoots";

export const getUpdateUserRootsLoading = (state: UpdateUserRootsInitialState) => state.loading;
export const getUpdateUserRootsSuccess = (state: UpdateUserRootsInitialState) => state.success;
