import { SignUpInitialState } from "../../slices/auth/signup";

export const getSignUpLoading = (state: SignUpInitialState) => state.loading;

export const getEmailAfterSignUp = (state: SignUpInitialState) => state.email;
