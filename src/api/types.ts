/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 April 2020
 *
 * Define main type definitions for api class.
 */

/** External imports */
import { AxiosInstance, AxiosResponse } from 'axios';

/** Auth */
export namespace Auth {
    export type UserRole = 'DEFAULT_USER' | 'ADMIN';
    export interface User {
        id: string;
        email: string;
        name: string;
        lastName: string;
        role: UserRole;
    }

    /** =========================== */
    export interface SignInPayload {
        email: string;
        password: string;
    }

    export type SignInResponse = User;

    export type SignIn = (payload: SignInPayload) => Promise<AxiosResponse<SignInResponse>>;

    /** =========================== */
    export type MeReponse = User;
    export type Me = () => Promise<AxiosResponse<MeReponse>>;

    /** =========================== */
    export type LogoutResponse = any;
    export type Logout = () => Promise<AxiosResponse<LogoutResponse>>;
}

/** Subject */
export namespace Subject {
    /** Describe properties of subject */
    export interface Data {
        id: string;
        name: string;
        /** Icon image for desktop client */
        icon?: string;
        subSubject?: boolean;
    }

    export interface CreatePayload extends Pick<Data, 'name'> {
        subSubject?: boolean;
    }
}

export namespace TestSuite {
    type CreatePayload = FormData;
    type CreateReturn = any;
    export type Create = (payload: CreatePayload)
        => Promise<AxiosResponse<CreateReturn>>;
}

export interface IApi {
    instance: AxiosInstance;
    /** Auth */
    signIn: Auth.SignIn;
    me: Auth.Me;
    logout: Auth.Logout;

    /** Subject */
    subjectsData: () => Promise<AxiosResponse<Subject.Data[]>>;
    subSubjectsData: () => Promise<AxiosResponse<Subject.Data[]>>;
    createSubject: (payload: Subject.CreatePayload) => Promise<AxiosResponse<Subject.Data>>;

    /** Test suite */
    createTestSuite: TestSuite.Create;
}
