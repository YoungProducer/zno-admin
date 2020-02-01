import { SignInInitialState } from '../../slices/auth/signin';

export const getLoggedIn = (state: SignInInitialState) => state.loggedIn;

export const getSignInLoading = (state: SignInInitialState) => state.loading;

export const getUserData = (state: SignInInitialState) =>
    Object.assign({
        id: '',
        email: '',
        userName: '',
        role: '',
    },            {
        id: state.id,
        email: state.email,
        userName: state.userName,
        role: state.role,
    });
