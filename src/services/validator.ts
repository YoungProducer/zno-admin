import { validate } from 'isemail';

export const validateCredentials = (email: string, password: string): string[] | boolean => {
    const invalidCredentials = [];

    if (!validate(email)) {
        invalidCredentials.push('email');
    }

    if (password.length < 8) {
        invalidCredentials.push('password');
    }

    return invalidCredentials ? invalidCredentials : true;
};
