import { combineReducers } from 'redux';

import SignInReducer from './auth/signin';
import SignUpReducer from './auth/signup';
import MeReducer from './auth/me';
import RefreshReducer from './auth/refresh';
import LogoutReducer from './auth/logout';

import UpdateUserReducer from './update/user';
import UpdateUserRootsReducer from './update/userRoots';

import UsersSearchResultReducer from './users/searchResult';
import FindUserByEmailReducer from './users/findByEmail';

export default combineReducers({
    signin: SignInReducer,
    signup: SignUpReducer,
    me: MeReducer,
    refresh: RefreshReducer,
    logout: LogoutReducer,
    updateUser: UpdateUserReducer,
    updateUserRoots: UpdateUserRootsReducer,
    usersSearchResult: UsersSearchResultReducer,
    findUserByEmail: FindUserByEmailReducer,
});
