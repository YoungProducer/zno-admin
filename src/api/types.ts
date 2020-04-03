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

    export interface SignInPayload {
        email: string;
        password: string;
    }

    export interface SignInResponseData {
        id: string;
        email: string;
        name: string;
        lastName: string;
        role: UserRole;
    }
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

export interface IApi {
    instance: AxiosInstance;
    /** Auth */
    signIn: (payload: Auth.SignInPayload) => Promise<AxiosResponse<Auth.SignInResponseData>>;

    /** Subject */
    subjectsData: () => Promise<AxiosResponse<Subject.Data[]>>;
    subSubjectsData: () => Promise<AxiosResponse<Subject.Data[]>>;
    createSubject: (payload: Subject.CreatePayload) => Promise<AxiosResponse<Subject.Data>>;
}
