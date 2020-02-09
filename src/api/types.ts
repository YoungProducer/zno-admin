// Created by: Oleksandr Bezrukov
// Creation date: 8 February 2020

/**
 * Describe all types and interfaces related to API.
 * Describe main interface for class 'api'.
 */

// Externals imports
import { AxiosResponse, AxiosInstance } from 'axios';

export interface ISignInCredentials {
    email: string;
    password: string;
}

export interface ICreateSubjectCredentials {
    name: string;
}

export interface IApi {
    axiosInstance: AxiosInstance;
    signIn: (cretentials: ISignInCredentials) => Promise<AxiosResponse>;
    createSubject: (credentials: ICreateSubjectCredentials) => Promise<AxiosResponse>;
    getSubjectsNames: () => Promise<AxiosResponse>;
}
