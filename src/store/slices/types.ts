// Created by: Oleksandr Bezrukov
// Creation date: 8 January 2020

// Describe main types for slices

export interface StateWithLoading {
    loading: boolean;
}

export type LoadingPayload = boolean;

export type ErrorFields<T = any> = {
    [attr in keyof T]?: boolean;
};

export type ErrorMessages<T = any> = {
    [attr in keyof T]?: string;
};

export type Errors<T = any> = {
    fields: ErrorFields<T>;
    messages: ErrorMessages<T>;
};

export type WithError<T = any> = T & { hasError: boolean };
