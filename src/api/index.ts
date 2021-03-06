/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Api class which contain all methods which related to admin part of zno-train application.
 */

/** External imports */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

/** Application's imports */
import {
    IApi,
    Auth,
    Subject,
    TestSuite,
} from './types';

class Api implements IApi {
    instance!: AxiosInstance;

    constructor() {
        const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:4000';

        this.instance = axios.create({
            baseURL: apiEndpoint,
            timeout: 10000,
        });
    }

    signIn: Auth.SignIn = async (payload) =>
        await this.instance.post(
            '/api/auth/admin/signin',
            payload,
            { withCredentials: true },
        )

    me: Auth.Me = async () =>
        await this.instance.get(
            'api/auth/admin/me',
            { withCredentials: true },
        )

    logout: Auth.Logout = async () =>
        await this.instance.post(
            'api/auth/admin/logout',
            {},
            { withCredentials: true },
        )

    subjectsData = async (): Promise<AxiosResponse<Subject.Data[]>> =>
        await this.instance.get(
            '/api/subject',
            { withCredentials: true },
        )

    subSubjectsData = async (): Promise<AxiosResponse<Subject.Data[]>> =>
        await this.instance.get(
            '/api/subject?subSubject=true',
            { withCredentials: true },
        )

    createSubject = async (payload: Subject.CreatePayload): Promise<AxiosResponse<Subject.Data>> =>
        await this.instance.post(
            '/api/subject',
            payload,
            { withCredentials: true },
        )

    createTestSuite: TestSuite.Create = async (payload) =>
        await this.instance.post(
            '/api/test-suite',
            payload,
            { withCredentials: true },
        )
}

export default new Api();
